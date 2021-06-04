import axios from 'axios';
import EnvoyAPI from './EnvoyAPI';
import EnvoyPluginJobUpdate from './EnvoyPluginJobUpdate';
import EnvoyStorageCommand from './EnvoyStorageCommand';
import EnvoyStorageItem from './EnvoyStorageItem';
import { envoyBaseURL, envoyClientId, envoyClientSecret } from './constants';
import { EnvoyMetaAuth } from './EnvoyMeta';

/**
 * API endpoints for *plugin-scoped* tokens.
 */
export default class EnvoyPluginAPI extends EnvoyAPI {
  async updateJob(jobId: string, update: EnvoyPluginJobUpdate): Promise<void> {
    await this.axios({
      method: 'PATCH',
      url: `/api/v2/plugin-services/jobs/${jobId}`,
      data: update,
    });
  }

  async getPluginInstallConfig(installId: string): Promise<Record<string, unknown>> {
    const { data } = await this.axios.get(`/api/v2/plugin-services/installs/${installId}/config`);
    return data.data;
  }

  async setPluginInstallConfig(installId: string, config: Record<string, unknown>): Promise<void> {
    await this.axios({
      method: 'PUT',
      url: `/api/v2/plugin-services/installs/${installId}/config`,
      data: config,
    });
  }

  async storagePipeline(
    commands: Array<EnvoyStorageCommand>,
    installId?: string,
  ): Promise<Array<EnvoyStorageItem | null>> {
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
  static async login(id = envoyClientId, secret = envoyClientSecret): Promise<EnvoyMetaAuth> {
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
        scope: 'plugin,token.refresh',
      },
      url: '/a/auth/v0/token',
      baseURL: envoyBaseURL,
    });
    return data;
  }
}
