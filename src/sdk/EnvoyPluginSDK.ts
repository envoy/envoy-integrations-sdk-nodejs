import EnvoyMeta, { EnvoyEventMeta, EnvoyRouteMeta } from './EnvoyMeta';
import EnvoyPluginStorage from './EnvoyPluginStorage';
import EnvoyPluginJob from './EnvoyPluginJob';
import EnvoyJWT from '../util/EnvoyJWT';
import EnvoyUserAPI from './EnvoyUserAPI';
import EnvoyPluginAPI from './EnvoyPluginAPI';

/**
 * Every Envoy request has a `meta` and `payload`.
 * @category Request
 */
export interface EnvoyRequestBody<Meta, Payload> {
  meta: Meta,
  payload: Payload,
}

/**
 * Sets up all relevant Envoy functions.
 * Attaches itself to every request object using our `middleware`,
 * to allow for easy access to Envoy functions.
 *
 * @category SDK
 */
export default class EnvoyPluginSDK<Meta extends EnvoyMeta = EnvoyMeta, Payload = unknown> {
  /**
   * Body of the request.
   * use `meta` or `payload` to access the relevant properties,
   * instead of this directly.
   */
  private readonly body: EnvoyRequestBody<Meta, Payload>;

  /**
   * Verified that the request comes from Envoy.
   */
  private readonly isVerified: boolean;

  /**
   * The internally managed plugin access token.
   * Use the `pluginAPI` instead of this directly.
   */
  private readonly pluginAccessToken: string | null = null;

  constructor(body: EnvoyRequestBody<Meta, Payload>, isVerified = false, pluginAccessToken: string | null = null) {
    this.body = body;
    this.isVerified = isVerified;
    this.pluginAccessToken = pluginAccessToken;
  }

  /**
   * The metadata for the request.
   * Either an EnvoyEventMeta or EnvoyRouteMeta.
   */
  get meta(): Meta {
    if (!this.isVerified) {
      throw new Error('Could not verify meta.');
    }
    return this.body.meta;
  }

  /**
   * The payload for the request.
   * For events, it's some Envoy resource, like an Entry or Invite.
   * For setup step validation URLs, it's the form submitted values for a validation URL.
   */
  get payload(): Payload {
    if (!this.isVerified) {
      throw new Error('Could not verify payload.');
    }
    return this.body.payload;
  }

  /**
   * Envoy API scoped to the user.
   * Used only in routes.
   */
  get userAPI(): EnvoyUserAPI {
    const { meta } = this;
    const { auth } = meta;
    let accessToken: string | undefined = auth?.access_token;
    if (!accessToken && 'forwarded_bearer_token' in meta) {
      accessToken = (meta as EnvoyRouteMeta).forwarded_bearer_token;
    }
    if (!accessToken) {
      throw new Error("This user's API token was not found. Either no scopes were asked for, or this is a route.");
    }
    return new EnvoyUserAPI(accessToken);
  }

  /**
   * Envoy API scoped to the plugin.
   * Used to perform storage or job operations.
   */
  get pluginAPI(): EnvoyPluginAPI {
    const { pluginAccessToken } = this;
    if (!pluginAccessToken) {
      throw new Error('No API token found. Are your Envoy client ID and secret set?');
    }
    return new EnvoyPluginAPI(pluginAccessToken);
  }

  /**
   * A function that returns an instance of EnvoyPluginStorage,
   * optionally scoped to an install ID.
   *
   * Use `installStorage` or `globalStorage` instead of this directly.
   */
  private get getStorage(): (installId?: string) => EnvoyPluginStorage {
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
      return (meta as EnvoyEventMeta).job.id;
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
