import { isAxiosError } from 'axios';
import { SignInFieldCreationModel, SignInFieldModel } from '../resources/SignInFieldResource';
import { ensureError } from '../util/errorHandling';
import promiseAllSettled from '../util/promiseAllSettled';
import EnvoySignInFieldManager from './EnvoySignInFieldManager';
import EnvoyUserAPI from './EnvoyUserAPI';

export enum FieldErrorCodes {
  FieldNotFound = 'FieldNotFound',
  FieldUpdateFailed = 'FieldUpdateFailed',
  FieldCreateFailed = 'FieldCreateFailed',
  FieldDeleteFailed = 'FieldDeleteFailed',
  UpdateFieldByNameFailed = 'UpdateFieldByNameFailed',
  GetFlowForFieldFailed = 'GetFlowForFieldFailed',
  Unknown = 'Unknown',
}

type FieldError = {
  code: FieldErrorCodes;
  message: string;
  originalError: Error;
} & (
  | {
      fieldId: string;
    }
  | {
      flowId: string;
    }
);

type FieldConfig = SignInFieldCreationModel['attributes'];

type FieldOperationResult<T> = {
  errors: FieldError[];
  data?: T;
};

/**
 * Manages sign-in fields across Envoy visitor flows.
 * This class provides functionality to create, update, validate, and delete fields
 * while maintaining synchronization between flows and their associated fields.
 */
class EnvoySignInFieldFlowManager {
  private readonly signInFieldManager: EnvoySignInFieldManager;

  private readonly defaultFieldConfig: FieldConfig;

  constructor(userAPI: EnvoyUserAPI, defaultFieldConfig: FieldConfig) {
    this.signInFieldManager = new EnvoySignInFieldManager(userAPI);
    this.defaultFieldConfig = defaultFieldConfig;
  }

  private async validateFields(
    fieldIds: string[],
  ): Promise<FieldOperationResult<{ validFields: string[]; invalidFields: string[] }>> {
    const validFields: string[] = [];
    const invalidFields: string[] = [];
    const errors: FieldError[] = [];

    await promiseAllSettled(
      fieldIds.map(async (fieldId) => {
        try {
          await this.signInFieldManager.getFieldById(fieldId);
          validFields.push(fieldId);
        } catch (err) {
          const error = ensureError(err);
          invalidFields.push(fieldId);

          const fieldNotFoundError = isAxiosError(error) && error.response?.status === 404;
          errors.push({
            code: fieldNotFoundError ? FieldErrorCodes.FieldNotFound : FieldErrorCodes.Unknown,
            fieldId,
            message: error.message,
            originalError: error,
          });
        }
      }),
    );

    return {
      data: { validFields, invalidFields },
      errors,
    };
  }

  /**
   * Validates fields (ie checks for existence) across multiple flows, returns a map of valid flow-to-field mappings.
   */
  async validateFlowFields(
    flowsToFieldsMap: Record<string, string>,
  ): Promise<FieldOperationResult<Record<string, string>>> {
    const errors: FieldError[] = [];
    const updatedFlowsToFieldsMap = { ...flowsToFieldsMap };

    const validationResult = await this.validateFields(Object.values(updatedFlowsToFieldsMap));
    if (validationResult.errors.length) {
      errors.push(...validationResult.errors);
    }

    Object.entries(updatedFlowsToFieldsMap).forEach(([flowId, fieldId]) => {
      if (validationResult.data?.invalidFields.includes(fieldId)) {
        delete updatedFlowsToFieldsMap[flowId];
      }
    });

    return {
      data: updatedFlowsToFieldsMap,
      errors,
    };
  }

  private async deleteFields(
    removedFlows: string[],
    flowsToFieldsMap: Record<string, string>,
  ): Promise<FieldOperationResult<Record<string, string>>> {
    const updatedFlowsToFieldsMap = { ...flowsToFieldsMap };
    const errors: FieldError[] = [];

    await promiseAllSettled(
      removedFlows.map(async (flowId) => {
        const fieldId = updatedFlowsToFieldsMap[flowId];
        try {
          delete updatedFlowsToFieldsMap[flowId];
          await this.signInFieldManager.deleteField(fieldId);
        } catch (err) {
          const error = ensureError(err);
          errors.push({
            code: FieldErrorCodes.FieldDeleteFailed,
            message: error.message,
            originalError: error,
            flowId,
            fieldId,
          });
        }
      }),
    );

    return {
      data: updatedFlowsToFieldsMap,
      errors,
    };
  }

  /**
   * Removes fields for flows that are no longer in the desired flows list.
   * Deletes them from Envoy and removes them from the flow to field mapping.
   */
  async cleanupFlows(
    flowsToFieldsMap: Record<string, string>,
    desiredFlows: string[],
  ): Promise<FieldOperationResult<Record<string, string>>> {
    const flowsToDelete = Object.keys(flowsToFieldsMap).filter((flowId) => !desiredFlows.includes(flowId));
    const result = await this.deleteFields(flowsToDelete, flowsToFieldsMap);

    return result;
  }

  /**
   * Updates the flow-to-field mapping by finding fields with matching names in each flow.
   * This is useful for handling cases where fields are edited by other actors (eg users, other apps).
   */
  async updateFlowFieldsByName(
    flowsToFieldsMap: Record<string, string>,
    desiredFlows: string[],
  ): Promise<FieldOperationResult<Record<string, string>>> {
    const errors: FieldError[] = [];
    const updatedFlowsToFieldsMap = { ...flowsToFieldsMap };

    await promiseAllSettled(
      desiredFlows.map(async (flowId) => {
        try {
          const fields = await this.signInFieldManager.getFieldsByFlowId(flowId);
          const cardNumberField = fields.find((field) => field.attributes.name === this.defaultFieldConfig.name);
          if (cardNumberField) {
            updatedFlowsToFieldsMap[flowId] = cardNumberField.id;

            try {
              const newFlow = await this.signInFieldManager.getFlowByFieldId(cardNumberField.id);
              const newFlowId = newFlow.id;
              if (String(newFlowId) !== String(flowId)) {
                // This can happen with global flows, where flowId is the child flow, and newFlowId is the global flow.
                updatedFlowsToFieldsMap[newFlowId] = cardNumberField.id;
              }
            } catch (err) {
              const error = ensureError(err);
              errors.push({
                code: FieldErrorCodes.GetFlowForFieldFailed,
                message: error.message,
                originalError: error,
                flowId,
                fieldId: cardNumberField.id,
              });
            }
          }
        } catch (err) {
          const error = ensureError(err);
          errors.push({
            code: FieldErrorCodes.UpdateFieldByNameFailed,
            message: error.message,
            originalError: error,
            flowId,
          });
        }
      }),
    );

    return {
      data: updatedFlowsToFieldsMap,
      errors,
    };
  }

  /**
   * Updates an existing field with default attributes.
   */
  private async updateField(fieldId: string): Promise<FieldOperationResult<SignInFieldModel>> {
    try {
      const fieldData = {
        type: 'sign-in-fields',
        attributes: {
          kind: this.defaultFieldConfig.kind,
          name: this.defaultFieldConfig.name,
          required: this.defaultFieldConfig.required,
          'store-response': this.defaultFieldConfig['store-response'],
        },
      };

      const updatedField = await this.signInFieldManager.updateField(fieldId, fieldData);
      return {
        data: updatedField,
        errors: [],
      };
    } catch (err) {
      const error = ensureError(err);
      return {
        errors: [
          {
            code: FieldErrorCodes.FieldUpdateFailed,
            message: error.message,
            originalError: error,
            fieldId,
          },
        ],
      };
    }
  }

  /**
   * Creates a new field with default attributes for the provided flow.
   */
  private async createField(flowId: string): Promise<FieldOperationResult<SignInFieldModel>> {
    try {
      const page = await this.signInFieldManager.getEditableSignInFieldPageByFlowId(flowId);
      const fieldData: SignInFieldCreationModel = {
        id: undefined,
        type: 'sign-in-fields',
        attributes: {
          kind: this.defaultFieldConfig.kind,
          name: this.defaultFieldConfig.name,
          required: this.defaultFieldConfig.required,
          'store-response': this.defaultFieldConfig['store-response'],
        },
        relationships: {
          'sign-in-field-page': {
            data: {
              type: 'sign-in-field-pages',
              id: page.id,
            },
          },
        },
      };

      const newField = await this.signInFieldManager.addField(fieldData);
      return {
        data: newField,
        errors: [],
      };
    } catch (err) {
      const error = ensureError(err);
      return {
        errors: [
          {
            code: FieldErrorCodes.FieldCreateFailed,
            message: error.message,
            originalError: error,
            flowId,
          },
        ],
      };
    }
  }

  /**
   * Creates new fields or updates existing ones for the specified flows.
   * For flows that already have the specified field, it updates them with the default configuration.
   * For flows without the specified field, it creates one with the default configuration.
   */
  async upsertFlowFields(
    flowsToFieldsMap: Record<string, string>,
    desiredFlows: string[],
  ): Promise<FieldOperationResult<Record<string, string>>> {
    const errors: FieldError[] = [];
    const updatedFlowsToFieldsMap = { ...flowsToFieldsMap };
    const flowsWithCardNumberField = Object.keys(updatedFlowsToFieldsMap);

    await promiseAllSettled(
      desiredFlows.map(async (flowId) => {
        if (flowsWithCardNumberField.includes(flowId)) {
          const updateResult = await this.updateField(updatedFlowsToFieldsMap[flowId]);
          if (updateResult.errors.length) {
            errors.push(...updateResult.errors);
          }
        } else {
          const createResult = await this.createField(flowId);
          if (createResult.data) {
            updatedFlowsToFieldsMap[flowId] = createResult.data.id;
          }
          errors.push(...createResult.errors);
        }
      }),
    );

    return {
      data: updatedFlowsToFieldsMap,
      errors,
    };
  }

  /**
   * Performs a complete synchronization of fields across all specified flows.
   * This operation:
   * 1. Validates existing fields
   * 2. Updates field mappings with field with matching name
   * 3. Cleans up fields for removed flows
   * 4. Creates or updates fields as needed
   *
   * Returns the updated flow-to-field mapping and any errors that occurred during the process.
   */
  async syncFields(
    flowsToFieldsMap: Record<string, string>,
    desiredFlows: string[],
  ): Promise<FieldOperationResult<{ flowsToFieldsMap: Record<string, string> }>> {
    const errors: FieldError[] = [];
    let updatedFlowsToFieldsMap = { ...flowsToFieldsMap };

    const validationResult = await this.validateFlowFields(updatedFlowsToFieldsMap);
    if (validationResult.data) {
      updatedFlowsToFieldsMap = validationResult.data;
    }
    if (validationResult.errors.length) {
      errors.push(...validationResult.errors);
    }
    const updateResult = await this.updateFlowFieldsByName(updatedFlowsToFieldsMap, desiredFlows);
    if (updateResult.data) {
      updatedFlowsToFieldsMap = updateResult.data;
    }
    if (updateResult.errors.length) {
      errors.push(...updateResult.errors);
    }
    const cleanupResult = await this.cleanupFlows(updatedFlowsToFieldsMap, desiredFlows);
    if (cleanupResult.data) {
      updatedFlowsToFieldsMap = cleanupResult.data;
    }
    if (cleanupResult.errors.length) {
      errors.push(...cleanupResult.errors);
    }
    const upsertResult = await this.upsertFlowFields(updatedFlowsToFieldsMap, desiredFlows);
    if (upsertResult.data) {
      updatedFlowsToFieldsMap = upsertResult.data;
    }
    if (upsertResult.errors.length) {
      errors.push(...upsertResult.errors);
    }
    return {
      data: { flowsToFieldsMap: updatedFlowsToFieldsMap },
      errors,
    };
  }
}

export default EnvoySignInFieldFlowManager;
