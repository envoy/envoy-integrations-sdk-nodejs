import { Url } from 'url';
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
import { sanitizeAxiosError } from '../util/axiosConstructor';
import { ReservationCreationAttributes, ReservationModel } from "../resources/ReservationResource";

export type EnvoyUserAPIScope =
  'flows.read' |
  'entries.read' |
  'entries.write' |
  'invites.read' |
  'invites.write' |
  'invites.attest' |
  'locations.read' |
  'companies.read' |
  'agreements.read' |
  'agreements.write' |
  'sign-in-field-pages.read' |
  'sign-in-fields.read' |
  'sign-in-fields.write' |
  'employees.read' |
  'employees.write' |
  'badges.read' |
  'blacklist-filters.read' |
  'blacklist-filters.write' |
  'tickets.read' |
  'tickets.write' |
  'spaces.read' |
  'reservations.read' |
  'reservations.write' |
  string;

/**
 * API endpoints for *user-scoped* tokens.
 * To access Envoy resources, this is the API you'd want.
 *
 * @category API
 * @category Request Object
 */
export default class EnvoyUserAPI extends EnvoyAPI {
  /**
   *
   * {@link AgreementPageModel}
   */
  async getAgreementPage(id: string, include?: string): Promise<AgreementPageModel> {
    return this.dataLoader.load({ type: 'agreement-pages', id, include });
  }

  /**
   * Requires `agreements.read` scope.
   */
  async getAgreement(id: string, include?: string): Promise<AgreementModel> {
    return this.dataLoader.load({ type: 'agreements', id, include });
  }

  /**
   * Requires `companies.read` scope.
   */
  async getCompany(id: string, include?: string): Promise<CompanyModel> {
    return this.dataLoader.load({ type: 'companies', id, include });
  }

  /**
   * Requires `employees.read` scope.
   */
  async getEmployee(id: string, include?: string): Promise<EmployeeModel> {
    return this.dataLoader.load({ type: 'employees', id, include });
  }

  /**
   * Requires `flows.read` scope.
   */
  async getFlow(id: string, include?: string): Promise<FlowModel> {
    return this.dataLoader.load({ type: 'flows', id, include });
  }

  /**
   * Requires `locations.read` scope.
   */
  async getLocation(id: string, include?: string): Promise<LocationModel> {
    return this.dataLoader.load({ type: 'locations', id, include });
  }

  /**
   * Requires `sign-in-field-pages.read` scope.
   */
  async getSignInFieldPage(id: string, include?: string): Promise<SignInFieldPageModel> {
    return this.dataLoader.load({ type: 'sign-in-field-pages', id, include });
  }

  /**
   * Requires `sign-in-fields.read` scope.
   */
  async getSignInField(id: string, include?: string): Promise<SignInFieldModel> {
    return this.dataLoader.load({ type: 'sign-in-fields', id, include });
  }

  /**
   * Requires `employees.read` scope.
   */
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

  /**
   * Requires `employees.read` scope.
   */
  async getEmployees(
    params?: JSONAPIPaginationParams<EmployeeFilterFields, EmployeeSortFields>,
  ): Promise<Array<EmployeeModel>> {
    const { data } = await this.axios.get('/api/v3/employees', { params });
    return data.data;
  }

  /**
   * Requires `flows.read` scope.
   */
  async getFlows(params?: JSONAPIPaginationParams<FlowFilterFields, FlowSortFields>): Promise<Array<FlowModel>> {
    const { data } = await this.axios.get('/api/v3/flows', { params });
    return data.data;
  }

  /**
   * Requires `locations.read` scope.
   */
  async getLocations(
    params?: JSONAPIPaginationParams<LocationFilterFields, LocationSortFields>,
  ): Promise<Array<LocationModel>> {
    const { data } = await this.axios.get('/api/v3/locations', { params });
    return data.data;
  }

  /**
   * Requires `sign-in-fields.read` scope.
   */
  async getSignInFields(signInFieldPageId: string): Promise<Array<SignInFieldModel>> {
    const { data } = await this.axios.get(`/api/v3/sign-in-field-pages/${signInFieldPageId}/sign-in-fields`);
    return data.data;
  }

  /**
   * Requires `invites.read` scope.
   */
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

  /**
   * Requires `invites.write` scope.
   * May also require `invites.attest` scope if setting `attested: true`.
   */
  async createInvite(invite: InviteCreationModel): Promise<InviteModel> {
    const { data } = await this.axios({
      method: 'POST',
      url: '/api/v3/invites',
      data: { data: invite },
    });
    return data.data;
  }

  async createReservation(reservationDetails: ReservationCreationAttributes): Promise<ReservationModel> {
    let createReservationBody = {
      data: {
        relationships: {
          user: {
            data: {
              type: 'users',
              id: reservationDetails.userId
            }},
          ...(reservationDetails.locationId && {
              location: {
                data: {
                  type: 'locations',
                  id: reservationDetails.locationId
                }
              }
            }
          )
        },
        attributes: {
            'start-time': reservationDetails.startTime,
            ...(reservationDetails.endTime && {
                'end-time': reservationDetails.endTime
            }),
            'booking-source': 'EXTERNAL_API',
            'booking-type': 'visitor'
        }
      }
    }
    const { data } = await this.axios({
      method: 'POST',
      url: '/a/rms/reservations',
      data: createReservationBody,
    });
    return data.data;
  }

  /**
   * Requires `invites.write` scope.
   */
  async updateInvite(inviteId: string, invite: InviteCreationModel): Promise<InviteModel> {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/api/v3/invites/${inviteId}`,
      data: { data: { ...invite, id: inviteId } },
    });

    return data.data;
  }

  /**
   * Requires `invites.write` scope.
   */
  async partialUpdateInvite(inviteId: string, invite: InviteCreationModel): Promise<InviteModel> {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/api/v3/invites/${inviteId}`,
      data: { data: { ...invite, id: inviteId } },
    });

    return data.data;
  }

  /**
   * Requires `invites.write` scope.
   */
  async removeInvite(inviteId: string): Promise<void> {
    await this.axios({
      method: 'DELETE',
      url: `/api/v3/invites/${inviteId}`,
    });
  }

  /**
   * Builds the authorize URL to redirect a user to initiate the auth code oauth2 flow.
   *
   * Upon completion, they will be redirected to `redirectURL`, with a `code` query param in the url.
   *
   * Use the {@link loginAsUserWithCode} method to exchange that code for an access token.
   */
  static getAuthorizeURL(redirectURL: string, scope: Array<EnvoyUserAPIScope>, clientId = envoyClientId): string {
    const url = new URL(envoyBaseURL);
    url.pathname = '/a/auth/v0/authorize';
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('redirect_uri', redirectURL);
    return `${url.href}&scope=${scope.join('+')}`;
  }

  /**
   * Gets a user access token using `password` as the grant type (discouraged - use {@link loginAsUserWithCode} below).
   */
  static async loginAsUserWithPassword(
    username: string,
    password: string,
    scope: Array<EnvoyUserAPIScope>,
    clientId = envoyClientId,
    clientSecret = envoyClientSecret,
  ): Promise<EnvoyMetaAuth> {
    try {
      const { data } = await axios({
        auth: {
          username: clientId,
          password: clientSecret,
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
    } catch (error) {
      throw sanitizeAxiosError(error);
    }
  }

  /**
   * Gets a user access token using `code` as the grant type.
   */
  static async loginAsUserWithCode(
    code: string,
    scope: Array<EnvoyUserAPIScope>,
    clientId = envoyClientId,
    clientSecret = envoyClientSecret,
  ): Promise<EnvoyMetaAuth> {
    try {
      const { data } = await axios({
        auth: {
          username: clientId,
          password: clientSecret,
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
    } catch (error) {
      throw sanitizeAxiosError(error);
    }
  }

  /**
   * Gets a user access token using `plugin_install` as the grant type.
   */
  static async loginAsPluginInstaller(
    installId: string,
    clientId = envoyClientId,
    clientSecret = envoyClientSecret,
  ): Promise<EnvoyMetaAuth> {
    try {
      const { data } = await axios({
        auth: {
          username: clientId,
          password: clientSecret,
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
    } catch (error) {
      throw sanitizeAxiosError(error);
    }
  }
}
