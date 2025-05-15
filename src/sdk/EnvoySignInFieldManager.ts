import { SignInFieldCreationModel, SignInFieldModel } from '../resources/SignInFieldResource';
import { SignInFieldPageModel } from '../resources/SignInFieldPageResource';
import { ensureError } from '../util/errorHandling';
import JSONAPIResponse from '../util/json-api/JSONAPIResponse';
import EnvoyUserAPI from './EnvoyUserAPI';
import { FlowModel } from '../resources/FlowResource';

type RecursivePartial<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

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
    const response = await this.userAPI.axios.post<JSONAPIResponse<SignInFieldModel>>('/api/v3/sign-in-fields', {
      data: fieldData,
    });

    const field = response.data.data;
    return field;
  }

  async deleteField(signInFieldId: string): Promise<void> {
    try {
      await this.userAPI.axios.delete(`/api/v3/sign-in-fields/${signInFieldId}`);
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

  async updateField(signInFieldId: string, patchData: RecursivePartial<SignInFieldModel>): Promise<SignInFieldModel> {
    patchData.id = signInFieldId;
    const response = await this.userAPI.axios.put<JSONAPIResponse<SignInFieldModel>>(
      `/api/v3/sign-in-fields/${signInFieldId}`,
      {
        data: patchData,
      },
    );

    const field = response.data.data;
    return field;
  }

  async getFieldById(signInFieldId: string): Promise<SignInFieldModel> {
    const response = await this.userAPI.axios.get<JSONAPIResponse<SignInFieldModel>>(
      `/api/v3/sign-in-fields/${signInFieldId}`,
      {
        data: {},
        params: {
          include: 'sign-in-field-page,sign-in-field-page.flow',
        },
      },
    );

    const field = response.data.data;
    return field;
  }

  async getFieldsByFlowId(flowId: string): Promise<SignInFieldModel[]> {
    const response = await this.userAPI.axios.get<JSONAPIResponse<FlowModel[]>>(`/api/v3/flows/${flowId}`, {
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

  async getFlowByFieldId(signInFieldId: string): Promise<FlowModel> {
    const response = await this.userAPI.axios.get<JSONAPIResponse<SignInFieldModel>>(
      `/api/v3/sign-in-fields/${signInFieldId}`,
      {
        data: {},
        params: {
          include: 'sign-in-field-page,sign-in-field-page.flow',
        },
      },
    );
    if (!response.data.included) {
      throw new Error('No flow data found');
    }

    const included = response.data.included as (SignInFieldPageModel | FlowModel)[];
    const flow = included.find((item) => item.type === 'flows') as FlowModel;
    return flow;
  }

  async getSignInFieldPageIdByFlowId(flowId: string): Promise<SignInFieldPageModel> {
    const response = await this.userAPI.axios.get<JSONAPIResponse<FlowModel>>(`/api/v3/flows/${flowId}`, {
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

  async getEditableSignInFieldPageByFlowId(flowId: string): Promise<SignInFieldPageModel> {
    // We can't rely on userAPI.getFlow because it may not return the included data
    const response = await this.userAPI.axios.get<JSONAPIResponse<FlowModel>>(`/api/v3/flows/${flowId}`, {
      data: {},
      params: {
        include: 'sign-in-field-page',
      },
    });

    let { included } = response.data;
    const flow = response.data.data;
    if (flow.attributes.type?.includes('GlobalChild')) {
      const globalFlowData = flow.relationships['global-flow'];
      const globalFlowId = globalFlowData.data && 'id' in globalFlowData.data ? globalFlowData.data.id : null;
      if (!globalFlowId) {
        throw new Error('Global flow ID expected but not found');
      }
      const globalFlow = await this.userAPI.axios.get<JSONAPIResponse<FlowModel>>(`/api/v3/flows/${globalFlowId}`, {
        data: {},
        params: {
          include: 'sign-in-field-page',
        },
      });
      included = globalFlow.data.included;
    }

    if (!included) {
      throw new Error('No sign in field page found');
    }

    const page = included[0] as SignInFieldPageModel;
    return page;
  }
}
