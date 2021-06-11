import axios from 'axios';
import EnvoyAPI from '../base/EnvoyAPI';
import { AgreementPageModel } from '../resources/AgreementPageResource';
import { AgreementModel } from '../resources/AgreementResource';
import { CompanyModel } from '../resources/CompanyResource';
import { EmployeeFilterFields, EmployeeModel, EmployeeSortFields } from '../resources/EmployeeResource';
import { FlowFilterFields, FlowModel, FlowSortFields } from '../resources/FlowResource';
import { LocationFilterFields, LocationModel, LocationSortFields } from '../resources/LocationResource';
import { SignInFieldPageModel } from '../resources/SignInFieldPageResource';
import { SignInFieldModel } from '../resources/SignInFieldResource';
import JSONAPIPaginationParams from '../util/json-api/JSONAPIPaginationParams';
import {
  InviteCreationModel, InviteFilterFields, InviteModel, InviteSortFields,
} from '../resources/InviteResource';
import { UserModel } from '../resources/UserResource';
import { envoyBaseURL, envoyClientId, envoyClientSecret } from '../constants';
import { EnvoyMetaAuth } from './EnvoyMeta';

/**
 * API endpoints for *user-scoped* tokens.
 * To access Envoy resources, this is the API you'd want.
 *
 * @category API
 * @category Request Object
 */
export default class EnvoyUserAPI extends EnvoyAPI {
  async getAgreementPage(id: string, include?: string): Promise<AgreementPageModel> {
    return this.dataLoader.load({ type: 'agreement-pages', id, include });
  }

  async getAgreement(id: string, include?: string): Promise<AgreementModel> {
    return this.dataLoader.load({ type: 'agreements', id, include });
  }

  async getCompany(id: string, include?: string): Promise<CompanyModel> {
    return this.dataLoader.load({ type: 'companies', id, include });
  }

  async getEmployee(id: string, include?: string): Promise<EmployeeModel> {
    return this.dataLoader.load({ type: 'employees', id, include });
  }

  async getFlow(id: string, include?: string): Promise<FlowModel> {
    return this.dataLoader.load({ type: 'flows', id, include });
  }

  async getLocation(id: string, include?: string): Promise<LocationModel> {
    return this.dataLoader.load({ type: 'locations', id, include });
  }

  async getSignInFieldPage(id: string, include?: string): Promise<SignInFieldPageModel> {
    return this.dataLoader.load({ type: 'sign-in-field-pages', id, include });
  }

  async getSignInField(id: string, include?: string): Promise<SignInFieldModel> {
    return this.dataLoader.load({ type: 'sign-in-fields', id, include });
  }

  async getEmployeeByEmail(email: string, include?: string): Promise<EmployeeModel> {
    const paginationParams: JSONAPIPaginationParams<EmployeeFilterFields, EmployeeSortFields> = {
      filter: {
        email,
      },
      page: {
        limit: 1,
      },
    };
    const { data: { data: [employee] } } = await this.axios.get('/api/v3/employees', {
      params: {
        include,
        ...paginationParams,
      },
    });

    return employee;
  }

  async getEmployees(
    params?: JSONAPIPaginationParams<EmployeeFilterFields, EmployeeSortFields>,
  ): Promise<Array<EmployeeModel>> {
    const { data } = await this.axios.get('/api/v3/employees', { params });
    return data.data;
  }

  async getFlows(params?: JSONAPIPaginationParams<FlowFilterFields, FlowSortFields>): Promise<Array<FlowModel>> {
    const { data } = await this.axios.get('/api/v3/flows', { params });
    return data.data;
  }

  async getLocations(
    params?: JSONAPIPaginationParams<LocationFilterFields, LocationSortFields>,
  ): Promise<Array<LocationModel>> {
    const { data } = await this.axios.get('/api/v3/locations', { params });
    return data.data;
  }

  async getSignInFields(signInFieldPageId: string): Promise<Array<SignInFieldModel>> {
    const { data } = await this.axios.get(`/api/v3/sign-in-field-pages/${signInFieldPageId}/sign-in-fields`);
    return data.data;
  }

  async getInvites(
    params?: JSONAPIPaginationParams<InviteFilterFields, InviteSortFields>,
  ): Promise<Array<InviteModel>> {
    const { data } = await this.axios.get('/api/v3/invites', { params });
    return data.data;
  }

  async me(): Promise<UserModel> {
    const { data } = await this.axios.get('/api/v2/users/me');
    return data.data;
  }

  async createInvite(invite: InviteCreationModel): Promise<InviteModel> {
    const { data } = await this.axios({
      method: 'POST',
      url: '/api/v3/invites',
      data: { data: invite },
    });
    return data.data;
  }

  async updateInvite(inviteId: string, invite: InviteCreationModel): Promise<InviteModel> {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/api/v3/invites/${inviteId}`,
      data: { data: { ...invite, id: inviteId } },
    });

    return data.data;
  }

  async partialUpdateInvite(inviteId: string, invite: InviteCreationModel): Promise<InviteModel> {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/api/v3/invites/${inviteId}`,
      data: { data: { ...invite, id: inviteId } },
    });

    return data.data;
  }

  async removeInvite(inviteId: string): Promise<void> {
    await this.axios({
      method: 'DELETE',
      url: `/api/v3/invites/${inviteId}`,
    });
  }

  /**
   * Gets a user access token using `password` as the grant type (discouraged).
   */
  static async loginAsUserWithPassword(
    username: string,
    password: string,
    scope: Array<string> = [],
    id = envoyClientId,
    secret = envoyClientSecret,
  ): Promise<EnvoyMetaAuth> {
    const { data } = await axios({
      auth: {
        username: id,
        password: secret,
      },
      method: 'POST',
      data: {
        grant_type: 'password',
        scope,
        username,
        password,
      },
      url: '/a/auth/v0/token',
      baseURL: envoyBaseURL,
    });
    return data;
  }

  /**
   * Gets a user access token using `code` as the grant type.
   */
  static async loginAsUserWithCode(
    code: string,
    scope: Array<string> = [],
    id = envoyClientId,
    secret = envoyClientSecret,
  ): Promise<EnvoyMetaAuth> {
    const { data } = await axios({
      auth: {
        username: id,
        password: secret,
      },
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        scope,
        code,
      },
      url: '/a/auth/v0/token',
      baseURL: envoyBaseURL,
    });
    return data;
  }

  /**
   * Gets a user access token using `plugin_install` as the grant type.
   */
  static async loginAsPluginInstaller(
    installId: string,
    id = envoyClientId,
    secret = envoyClientSecret,
  ): Promise<EnvoyMetaAuth> {
    const { data } = await axios({
      auth: {
        username: id,
        password: secret,
      },
      method: 'POST',
      data: {
        grant_type: 'plugin_install',
        install_id: installId,
      },
      url: '/a/auth/v0/token',
      baseURL: envoyBaseURL,
    });
    return data;
  }
}
