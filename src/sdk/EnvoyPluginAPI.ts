import axios from 'axios';
import EnvoyAPI from '../base/EnvoyAPI';
import EnvoyPluginJobUpdate from '../internal/EnvoyPluginJobUpdate';
import EnvoyStorageCommand from '../internal/EnvoyStorageCommand';
import EnvoyStorageResult from '../internal/EnvoyStorageResult';
import { envoyBaseURL, envoyClientId, envoyClientSecret } from '../constants';
import { EnvoyMetaAuth } from './EnvoyMeta';
import { sanitizeAxiosError } from '../util/axiosConstructor';

/**
 * API endpoints for *plugin-scoped* tokens.
 *
 * @category API
 * @category Request Object
 */
export default class EnvoyPluginAPI extends EnvoyAPI {
  async updateJob(jobId: string, update: EnvoyPluginJobUpdate): Promise<void> {
    await this.axios({
      method: 'PATCH',
      url: `/api/v2/plugin-services/jobs/${jobId}`,
      data: update,
    });
  }

  /**
   * Fetches the current `config` saved for this install during setup by the customer.
   */
  async getPluginInstallConfig(installId: string): Promise<Record<string, unknown>> {
    const { data } = await this.axios.get(`/api/v2/plugin-services/installs/${installId}/config`);
    return data.data;
  }

  /**
   * Merges changes with the current `config` saved for this install during setup by the customer.
   *
   * To remove an item from the saved `config`, set the item's key to `null`.
   */
  async setPluginInstallConfig(installId: string, config: Record<string, unknown>): Promise<void> {
    await this.axios({
      method: 'PUT',
      url: `/api/v2/plugin-services/installs/${installId}/config`,
      data: config,
    });
  }

  async storagePipeline<Result extends EnvoyStorageResult = EnvoyStorageResult>(
    commands: Array<EnvoyStorageCommand>,
    installId?: string,
  ): Promise<Array<Result>> {
    const request: Record<string, unknown> = { commands };
    if (installId) {
      request.install_id = installId;
    }
    const { data } = await this.axios({
      method: 'POST',
      url: '/api/v2/plugin-services/storage',
      data: request,
    });
    return data.data;
  }

  async createNotification(installId: string, params = {}): Promise<void> {
    await this.axios({
      method: 'POST',
      url: `/api/v2/plugin-services/installs/${installId}/notifications`,
      data: params,
    });
  }

  /**
   * Gets a plugin access token using `client_credentials` as the grant type.
   */
  static async loginAsPlugin(id = envoyClientId, secret = envoyClientSecret, scope: string[] = ['plugin', 'token.refresh']): Promise<EnvoyMetaAuth> {
    try {
      const { data } = await axios({
        auth: {
          username: id,
          password: secret,
        },
        method: 'POST',
        data: {
          grant_type: 'client_credentials',
          client_id: id,
          client_secret: secret,
          scope: scope.join(','),
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
