import EnvoyMeta from './EnvoyMeta';
import EnvoyAPI from './EnvoyAPI';
import EnvoyPluginStorage from './EnvoyPluginStorage';
import EnvoyPluginJob from './EnvoyPluginJob';
import EnvoyJWT from './EnvoyJWT';

export interface EnvoyRequestBody<Meta, Payload> {
  meta: Meta,
  payload: Payload,
}

export default class EnvoyPluginSDK<Meta extends EnvoyMeta = EnvoyMeta, Payload = any> {
  readonly body: EnvoyRequestBody<Meta, Payload>;

  isVerified = false;

  pluginAccessToken: string | null = null;

  constructor(body: EnvoyRequestBody<Meta, Payload>, isVerified = false, pluginAccessToken: string | null = null) {
    this.body = body;
    this.isVerified = isVerified;
    this.pluginAccessToken = pluginAccessToken;
  }

  get meta(): Meta {
    if (!this.isVerified) {
      throw new Error('Could not verify meta.');
    }
    return this.body.meta;
  }

  get payload(): Payload {
    if (!this.isVerified) {
      throw new Error('Could not verify payload.');
    }
    return this.body.payload;
  }

  /**
   * Envoy API scoped to the user.
   * Used only in routes.
   *
   * @returns {EnvoyAPI}
   */
  get userAPI() {
    const { meta } = this;
    const { auth } = meta;
    let accessToken: string | undefined = auth?.access_token;
    if (!accessToken && 'forwarded_bearer_token' in this.meta) {
      accessToken = this.meta.forwarded_bearer_token;
    }
    if (!accessToken) {
      throw new Error("This user's API token was not found. Are you in a route?");
    }
    return new EnvoyAPI(accessToken);
  }

  /**
   * Envoy API scoped to the plugin.
   * Used to perform storage or job operations.
   */
  get pluginAPI(): EnvoyAPI {
    const { pluginAccessToken } = this;
    if (!pluginAccessToken) {
      throw new Error('No API token found. Are your Envoy client ID and secret set?');
    }
    return new EnvoyAPI(pluginAccessToken);
  }

  get getStorage(): (installId?: string) => EnvoyPluginStorage {
    return (installId?) => new EnvoyPluginStorage(this.pluginAPI, installId);
  }

  /**
   * Storage scoped to the install.
   */
  get installStorage(): EnvoyPluginStorage {
    const { install_id: installId } = this.meta;
    if (!installId) {
      throw new Error('No install ID found in meta.');
    }
    return this.getStorage(installId);
  }

  /**
   * Storage scoped globally (across installs).
   */
  get globalStorage(): EnvoyPluginStorage {
    return this.getStorage();
  }

  /**
   * Returns a job based on an ID.
   */
  get getJob(): (jobId: string) => EnvoyPluginJob {
    return (jobId: string) => new EnvoyPluginJob(this.pluginAPI, jobId);
  }

  /**
   * Returns the current job's ID.
   */
  get jobId(): string | null {
    const { meta } = this;
    if ('job' in meta) {
      return meta.job.id;
    }
    return null;
  }

  /**
   * Perform operations on the current job.
   */
  get job(): EnvoyPluginJob {
    const { jobId } = this;
    if (!jobId) {
      throw new Error('No job found in meta. Are you in a worker?');
    }
    return this.getJob(jobId);
  }

  /**
   * A utility to encode and decode JWTs.
   * Useful for verifiable communications between plugin endpoints.
   */
  // eslint-disable-next-line class-methods-use-this
  get jwt(): EnvoyJWT {
    return new EnvoyJWT();
  }
}
