import { AxiosError, AxiosHeaders } from 'axios';
import SignInFieldFlowManager, { FieldErrorCodes } from '../src/sdk/SignInFieldFlowManager';
import SignInFieldManager from '../src/sdk/EnvoySignInFieldManager';
import EnvoyUserAPI from '../src/sdk/EnvoyUserAPI';
import { SignInFieldModel } from '../src/resources/SignInFieldResource';
import { FlowModel } from '../src/resources/FlowResource';
import { SignInFieldPageModel } from '../src/resources/SignInFieldPageResource';

jest.mock('../src/sdk/EnvoySignInFieldManager');
jest.mock('../src/sdk/EnvoyUserAPI');

describe('SignInFieldFlowManager', () => {
  const defaultFieldConfig = {
    name: 'Card Number',
    kind: 'text',
    required: true,
    'store-response': true,
  };

  let mockUserAPI: jest.Mocked<EnvoyUserAPI>;
  let mockSignInFieldManager: jest.Mocked<SignInFieldManager>;
  let manager: SignInFieldFlowManager;

  const createMockSignInField = (id: string): SignInFieldModel => ({
    id,
    type: 'sign-in-fields',
    attributes: {
      name: 'Card Number',
      kind: 'text',
      required: true,
      'ipad-localized-names': [],
      'store-response': true,
    },
    relationships: {
      'sign-in-field-page': {
        data: {
          type: 'sign-in-field-pages',
          id: 'page1',
        },
      },
    },
  });

  const createMockFlow = (id: string): FlowModel => ({
    id,
    type: 'flows',
    attributes: {
      name: 'Test Flow',
      'employee-centric': false,
      enabled: true,
      type: 'visitor',
      'created-at': '2024-01-01T00:00:00Z',
      'updated-at': '2024-01-01T00:00:00Z',
    },
    relationships: {
      location: {
        data: {
          type: 'locations',
          id: 'loc1',
        },
      },
      'sign-in-field-page': {
        data: {
          type: 'sign-in-field-pages',
          id: 'page1',
        },
      },
      'agreement-page': {
        data: null,
      },
      'global-flow': {
        data: null,
      },
    },
  });

  const createMockSignInFieldPage = (id: string): SignInFieldPageModel => ({
    id,
    type: 'sign-in-field-pages',
    attributes: {
      enabled: true,
      position: 1,
    },
    relationships: {
      flow: {
        data: {
          type: 'flows',
          id: 'flow1',
        },
      },
      'sign-in-fields': {
        data: [],
      },
      'actionable-sign-in-field-actions': {
        data: [],
      },
      'actionable-sign-in-fields': {
        data: [],
      },
      'sign-in-field-actions': {
        data: [],
      },
    },
  });

  beforeEach(() => {
    jest.resetAllMocks();
    mockUserAPI = new EnvoyUserAPI('test-token') as jest.Mocked<EnvoyUserAPI>;
    mockSignInFieldManager = new SignInFieldManager(mockUserAPI) as jest.Mocked<SignInFieldManager>;
    (SignInFieldManager as jest.Mock).mockImplementation(() => mockSignInFieldManager);
    manager = new SignInFieldFlowManager(mockUserAPI, defaultFieldConfig);
  });

  describe('validateFlowFields', () => {
    const mockFlowsToFieldsMap = {
      flow1: 'field1',
      flow2: 'field2',
    };

    it('returns valid fields and removes invalid ones', async () => {
      mockSignInFieldManager.getFieldById.mockResolvedValueOnce(createMockSignInField('field1')).mockRejectedValueOnce(
        new AxiosError('Not found', '404', undefined, undefined, {
          status: 404,
          data: null,
          headers: {},
          statusText: 'Field not found',
          config: {
            headers: new AxiosHeaders(),
          },
        }),
      );

      const result = await manager.validateFlowFields(mockFlowsToFieldsMap);

      expect(result.data).toEqual({ flow1: 'field1' });
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toEqual(
        expect.objectContaining({ code: FieldErrorCodes.FieldNotFound, fieldId: 'field2' }),
      );
    });

    it('handles all valid fields', async () => {
      mockSignInFieldManager.getFieldById
        .mockResolvedValueOnce(createMockSignInField('field1'))
        .mockResolvedValueOnce(createMockSignInField('field2'));

      const result = await manager.validateFlowFields(mockFlowsToFieldsMap);

      expect(result.data).toEqual(mockFlowsToFieldsMap);
      expect(result.errors).toHaveLength(0);
    });

    it('does not mutate the input', async () => {
      mockSignInFieldManager.getFieldById.mockRejectedValue(
        new AxiosError('Not found', '404', undefined, undefined, {
          status: 404,
          data: null,
          headers: {},
          statusText: 'Field not found',
          config: {
            headers: new AxiosHeaders(),
          },
        }),
      );

      const result = await manager.validateFlowFields(mockFlowsToFieldsMap);

      expect(result.data).not.toEqual(mockFlowsToFieldsMap);
      expect(mockFlowsToFieldsMap).toEqual({
        flow1: 'field1',
        flow2: 'field2',
      });
    });
  });

  describe('cleanupFlows', () => {
    const mockFlowsToFieldsMap = {
      flow1: 'field1',
      flow2: 'field2',
      flow3: 'field3',
    };

    it('removes fields for flows not in desired flows', async () => {
      const desiredFlows = ['flow1', 'flow3'];

      const result = await manager.cleanupFlows(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual({
        flow1: 'field1',
        flow3: 'field3',
      });
      expect(result.errors).toHaveLength(0);
    });

    it('deletes fields for flows not in desired flows', async () => {
      const desiredFlows = ['flow1', 'flow3'];

      await manager.cleanupFlows(mockFlowsToFieldsMap, desiredFlows);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockSignInFieldManager.deleteField).toHaveBeenCalledWith('field2');
    });

    it('updates map even when there are deletion errors', async () => {
      const desiredFlows = ['flow1'];
      mockSignInFieldManager.deleteField.mockRejectedValueOnce(new Error('Delete failed'));

      const result = await manager.cleanupFlows(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual({
        flow1: 'field1',
      });
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].code).toBe(FieldErrorCodes.FieldDeleteFailed);
    });

    it('does not mutate the input', async () => {
      const desiredFlows = ['flow1'];
      mockSignInFieldManager.deleteField.mockResolvedValue(undefined);

      const result = await manager.cleanupFlows(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).not.toEqual(mockFlowsToFieldsMap);
      expect(mockFlowsToFieldsMap).toEqual({
        flow1: 'field1',
        flow2: 'field2',
        flow3: 'field3',
      });
    });
  });

  describe('updateFlowFieldsByName', () => {
    const mockFlowsToFieldsMap = {
      flow1: 'field1',
    };

    it('updates fields found by name', async () => {
      const desiredFlows = ['flow1'];
      const mockField = createMockSignInField('new-field1');
      mockSignInFieldManager.getFieldsByFlowId.mockResolvedValue([mockField]);
      mockSignInFieldManager.getFlowByFieldId.mockResolvedValue(createMockFlow('flow1'));

      const result = await manager.updateFlowFieldsByName(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual({
        flow1: 'new-field1',
      });
      expect(result.errors).toHaveLength(0);
    });

    it('updates map when field is found in different flow', async () => {
      const desiredFlows = ['flow1'];
      const mockField = createMockSignInField('new-field1');
      mockSignInFieldManager.getFieldsByFlowId.mockResolvedValue([mockField]);
      mockSignInFieldManager.getFlowByFieldId.mockResolvedValue(createMockFlow('flow2'));

      const result = await manager.updateFlowFieldsByName(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual({
        flow1: 'new-field1',
        flow2: 'new-field1',
      });
      expect(result.errors).toHaveLength(0);
    });

    it('does not change map when field not found by name', async () => {
      const desiredFlows = ['flow1'];
      mockSignInFieldManager.getFieldsByFlowId.mockResolvedValue([]);

      const result = await manager.updateFlowFieldsByName(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual(mockFlowsToFieldsMap);
      expect(result.errors).toHaveLength(0);
    });

    it('does not mutate the input', async () => {
      const desiredFlows = ['flow1'];
      const mockField = createMockSignInField('new-field1');
      mockSignInFieldManager.getFieldsByFlowId.mockResolvedValue([mockField]);

      const result = await manager.updateFlowFieldsByName(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).not.toEqual(mockFlowsToFieldsMap);
    });
  });

  describe('upsertFlowFields', () => {
    const mockFlowsToFieldsMap = {
      flow1: 'field1',
    };

    it('updates existing fields and creates new ones', async () => {
      const desiredFlows = ['flow1', 'flow2'];
      mockSignInFieldManager.updateField.mockResolvedValue(createMockSignInField('field1'));
      mockSignInFieldManager.getEditableSignInFieldPageByFlowId.mockResolvedValue(createMockSignInFieldPage('page1'));
      mockSignInFieldManager.addField.mockResolvedValue(createMockSignInField('field2'));

      const result = await manager.upsertFlowFields(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual({
        flow1: 'field1',
        flow2: 'field2',
      });
      expect(result.errors).toHaveLength(0);
    });

    it('updates existing fields', async () => {
      const desiredFlows = ['flow1'];
      mockSignInFieldManager.updateField.mockResolvedValue(createMockSignInField('field1'));

      await manager.upsertFlowFields(mockFlowsToFieldsMap, desiredFlows);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockSignInFieldManager.updateField).toHaveBeenCalledWith('field1', {
        type: 'sign-in-fields',
        attributes: expect.objectContaining(defaultFieldConfig),
      });
    });

    it('creates new fields', async () => {
      const desiredFlows = ['flow2'];
      mockSignInFieldManager.getEditableSignInFieldPageByFlowId.mockResolvedValue(createMockSignInFieldPage('page1'));

      await manager.upsertFlowFields(mockFlowsToFieldsMap, desiredFlows);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockSignInFieldManager.addField).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'sign-in-fields',
          attributes: expect.objectContaining(defaultFieldConfig),
          relationships: {
            'sign-in-field-page': {
              data: {
                type: 'sign-in-field-pages',
                id: 'page1',
              },
            },
          },
        }),
      );
    });

    it('handles update and create errors', async () => {
      const desiredFlows = ['flow1', 'flow2'];
      mockSignInFieldManager.updateField.mockRejectedValue(new Error('Update failed'));
      mockSignInFieldManager.getEditableSignInFieldPageByFlowId.mockRejectedValue(new Error('Create failed'));

      const result = await manager.upsertFlowFields(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).toEqual(mockFlowsToFieldsMap);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].code).toBe(FieldErrorCodes.FieldUpdateFailed);
      expect(result.errors[1].code).toBe(FieldErrorCodes.FieldCreateFailed);
    });

    it('does not mutate the input', async () => {
      const desiredFlows = ['flow1', 'flow2'];
      mockSignInFieldManager.updateField.mockResolvedValue(createMockSignInField('field1'));
      mockSignInFieldManager.getEditableSignInFieldPageByFlowId.mockResolvedValue(createMockSignInFieldPage('page1'));
      mockSignInFieldManager.addField.mockResolvedValue(createMockSignInField('field2'));

      const result = await manager.upsertFlowFields(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data).not.toEqual(mockFlowsToFieldsMap);
    });
  });

  describe('syncFields', () => {
    const mockFlowsToFieldsMap = {
      flow1: 'field1',
      flow2: 'field2',
      flow3: 'field3',
    };

    it('performs full sync operation successfully', async () => {
      const desiredFlows = ['flow1', 'flow3', 'flow4'];
      const mockField1 = createMockSignInField('field1');
      const mockField3 = createMockSignInField('field3');
      const mockField4 = createMockSignInField('field4');

      mockSignInFieldManager.getFieldById.mockResolvedValueOnce(mockField1);
      mockSignInFieldManager.getFieldsByFlowId
        .mockResolvedValueOnce([mockField1])
        .mockResolvedValueOnce([mockField3])
        .mockResolvedValueOnce([]);
      mockSignInFieldManager.getFlowByFieldId
        .mockResolvedValueOnce(createMockFlow('flow1'))
        .mockResolvedValueOnce(createMockFlow('flow3'));
      mockSignInFieldManager.getEditableSignInFieldPageByFlowId.mockResolvedValueOnce(
        createMockSignInFieldPage('page1'),
      );
      mockSignInFieldManager.addField.mockResolvedValueOnce(mockField4);

      const result = await manager.syncFields(mockFlowsToFieldsMap, desiredFlows);

      expect(result.errors).toHaveLength(0);
      expect(result.data?.flowsToFieldsMap).toEqual({
        flow1: 'field1',
        flow3: 'field3',
        flow4: 'field4',
      });
    });

    it('handles errors during sync', async () => {
      const desiredFlows = ['flow1'];
      const mockField = createMockSignInField('field1');

      mockSignInFieldManager.getFieldsByFlowId.mockResolvedValue([mockField]);
      mockSignInFieldManager.getFlowByFieldId.mockResolvedValue(createMockFlow('flow1'));
      mockSignInFieldManager.getFieldById.mockRejectedValue(new Error('Validation failed'));

      const result = await manager.syncFields(mockFlowsToFieldsMap, desiredFlows);

      expect(result.data?.flowsToFieldsMap).toBeDefined();
      expect(result.data?.flowsToFieldsMap).toEqual({
        flow1: 'field1',
      });
      expect(result.errors).toHaveLength(3);
    });

    it('does not mutate the input', async () => {
      const desiredFlows: string[] = [];

      const results = await manager.syncFields(mockFlowsToFieldsMap, desiredFlows);

      expect(results.data?.flowsToFieldsMap).not.toEqual(mockFlowsToFieldsMap);
    });
  });
});
