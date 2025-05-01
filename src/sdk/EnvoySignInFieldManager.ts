import { SignInFieldCreationModel, SignInFieldModel } from '../resources/SignInFieldResource';
import { SignInFieldPageModel } from '../resources/SignInFieldPageResource';
import { ensureError } from '../util/errorHandling';
import JSONAPIResponse from '../util/json-api/JSONAPIResponse';
import EnvoyUserAPI from './EnvoyUserAPI';
import { FlowModel } from '../resources/FlowResource';

/**
 * API endpoints for managing sign in fields in Envoy visitor flows.
 *
 * @category API
 */
export default class SignInFieldManager {
  private userAPI: EnvoyUserAPI;

  constructor(userAPI: EnvoyUserAPI) {
    this.userAPI = userAPI;
  }

  async addField(fieldData: SignInFieldCreationModel): Promise<SignInFieldModel> {
    const response = await this.userAPI.axios<JSONAPIResponse<SignInFieldModel>>({
      method: 'POST',
      url: '/api/v3/sign-in-fields',
      data: {
        data: fieldData,
      },
    });

    const field = response.data.data;
    return field;
  }

  async deleteField(signInFieldId: string): Promise<void> {
    try {
      await this.userAPI.axios({
        method: 'DELETE',
        url: `/api/v3/sign-in-fields/${signInFieldId}`,
      });
    } catch (err) {
      const error = ensureError(err);
      // When the delete succeeds, EnvoyAPI throws an error with this message
      const isDataLoaderError = error.message.includes('The data you are looking for may not exist');
      if (isDataLoaderError) {
        return;
      }
      throw error;
    }
  }

  async updateField(signInFieldId: string, patchData: Partial<SignInFieldModel>): Promise<SignInFieldModel> {
    patchData.id = signInFieldId;
    const response = await this.userAPI.axios<JSONAPIResponse<SignInFieldModel>>({
      method: 'PUT',
      url: `/api/v3/sign-in-fields/${signInFieldId}`,
      data: {
        data: patchData,
      },
    });

    const field = response.data.data;
    return field;
  }

  async getFieldById(signInFieldId: string): Promise<SignInFieldModel> {
    const response = await this.userAPI.axios<JSONAPIResponse<SignInFieldModel>>({
      method: 'GET',
      url: `/api/v3/sign-in-fields/${signInFieldId}`,
      data: {},
      params: {
        include: 'sign-in-field-page,sign-in-field-page.flow',
      },
    });

    const field = response.data.data;
    return field;
  }

  async getFieldsByFlowId(flowId: string): Promise<SignInFieldModel[]> {
    const response = await this.userAPI.axios<JSONAPIResponse<FlowModel[]>>({
      method: 'GET',
      url: `/api/v3/flows/${flowId}`,
      data: {},
      params: {
        include: 'sign-in-field-page.sign-in-fields',
      },
    });

    if (!response.data.included) {
      throw new Error('Could not find sign in fields for flow');
    }

    const included = response.data.included as (SignInFieldModel | SignInFieldPageModel)[];
    const fields = included.filter((item) => item.type === 'sign-in-fields') as SignInFieldModel[];
    return fields;
  }

  async getSignInFieldPageIdByFlowId(flowId: string): Promise<SignInFieldPageModel> {
    const response = await this.userAPI.axios<JSONAPIResponse<FlowModel>>({
      method: 'GET',
      url: `/api/v3/flows/${flowId}`,
      data: {},
      params: {
        include: 'sign-in-field-page',
      },
    });

    if (!response.data.included) {
      throw new Error('Could not find sign in field page for flow');
    }

    const page = response.data.included[0] as SignInFieldPageModel;
    return page;
  }
}
