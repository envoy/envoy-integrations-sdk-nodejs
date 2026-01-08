import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ensureError } from './errorHandling';
import {
  getDiplomatClientInstall,
  useDiplomatV1Routing,
  isDiplomatV1Response,
  isDiplomatLatestResponse,
  utf8ToBase64,
  base64ToUtf8,
  DiplomatServerResponse,
} from './diplomat';
import { rootLogger } from './logger';

const logger = rootLogger.child({ source: 'diplomat-interceptor' });

/**
 * Ensures URL has trailing slash for proper concatenation in diplomat-client
 */
function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

export function sanitizeAxiosError(error: unknown): Error {
  if (!axios.isAxiosError(error)) {
    return ensureError(error);
  }

  const safeError = new AxiosError(
    error.message,
    error.code,
    {
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      headers: new AxiosHeaders(),
    },
    {
      url: error.request?.url,
      method: error.request?.method,
      baseURL: error.request?.baseURL,
      data: error.request?.data,
    },
    {
      data: error.response?.data,
      status: error.response?.status ?? 0,
      statusText: error.response?.statusText ?? '',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    },
  );
  safeError.stack = error.stack;
  return safeError;
}

/**
 * Request interceptor for diplomat routing.
 * Checks if the request should be routed through diplomat-server
 * based on the x-envoy-install-id header.
 */
async function diplomatRequestInterceptor(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  // Extract installId and correlationId from headers
  const installId = config.headers?.['x-envoy-install-id'] as string | undefined;
  const correlationId = config.headers?.['correlation-id'] as string | undefined;

  const contextLogger = logger.child({
    install_id: installId,
    correlation_id: correlationId,
  });

  if (!installId) {
    // No installId - skip diplomat routing
    return config;
  }

  try {
    contextLogger.debug('Checking diplomat configuration for request', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
    });

    // Check if diplomat is enabled for this install
    const diplomatConfig = await getDiplomatClientInstall(installId);

    if (!diplomatConfig || !diplomatConfig.enabled) {
      contextLogger.debug('Diplomat not enabled, using direct routing', {
        has_config: !!diplomatConfig,
        is_enabled: diplomatConfig?.enabled,
      });
      return config;
    }

    // Check v1 vs latest routing
    const useV1 = useDiplomatV1Routing(installId);
    const serverUrlEnvVar = useV1 ? 'DIPLOMAT_SERVER_V1_URL' : 'DIPLOMAT_SERVER_URL';
    const diplomatServerUrl = process.env[serverUrlEnvVar];
    const diplomatVersion = useV1 ? 'v1' : 'latest';

    contextLogger.debug('Diplomat enabled, checking server configuration', {
      client_id: diplomatConfig.client_id,
      diplomat_version: diplomatVersion,
      has_server_url: !!diplomatServerUrl,
      has_credentials: !!(process.env.DIPLOMAT_SERVER_AUTH_USERNAME && process.env.DIPLOMAT_SERVER_AUTH_PASSWORD),
    });

    if (
      !diplomatServerUrl
      || !process.env.DIPLOMAT_SERVER_AUTH_USERNAME
      || !process.env.DIPLOMAT_SERVER_AUTH_PASSWORD
    ) {
      contextLogger.debug('Missing diplomat server config, using direct routing', {
        diplomat_version: diplomatVersion,
        env_var: serverUrlEnvVar,
      });
      return config;
    }

    // Store original request info for response handling
    const originalBaseURL = config.baseURL || '';
    const originalUrl = config.url || '';
    const originalMethod = config.method || 'GET';

    // Convert AxiosHeaders to plain object for JSON serialization
    // AxiosHeaders instance has internal properties that break JSON.stringify when nested in request body
    let originalHeaders: Record<string, any> = {};
    if (config.headers) {
      // Use toJSON() if available (for AxiosHeaders instances)
      const headersObj =
        typeof config.headers.toJSON === 'function' ? config.headers.toJSON() : config.headers;

      // Filter to only include serializable string values for diplomat payload
      for (const [key, value] of Object.entries(headersObj)) {
        if (value !== null && value !== undefined) {
          originalHeaders[key] = String(value);
        }
      }
    }

    const originalParams = config.params;

    // Remove x-envoy-install-id from headers sent to target (it's only for SDK routing)
    delete originalHeaders['x-envoy-install-id'];

    // Encode request body as base64
    let encodedBody: string | undefined;
    if (config.data) {
      const dataString = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
      encodedBody = utf8ToBase64(dataString);
    }

    contextLogger.info('Routing request through diplomat', {
      diplomat_version: diplomatVersion,
      client_id: diplomatConfig.client_id,
      target_method: originalMethod.toUpperCase(),
      target_url: originalUrl,
      target_baseURL: originalBaseURL || diplomatConfig.internal_url,
      has_body: !!encodedBody,
    });

    // Transform request to diplomat format
    config.baseURL = diplomatServerUrl;
    config.url = `/clients/${diplomatConfig.client_id}/tasks`;
    config.method = 'POST';
    config.auth = {
      username: process.env.DIPLOMAT_SERVER_AUTH_USERNAME,
      password: process.env.DIPLOMAT_SERVER_AUTH_PASSWORD,
    };
    config.data = {
      handler: 'http',
      options: {
        method: originalMethod.toUpperCase(),
        baseURL: ensureTrailingSlash(diplomatConfig.internal_url),
        url: originalUrl,
        body: encodedBody || '',
        headers: originalHeaders,
      },
    };

    // Mark this request as diplomat-routed for response interceptor
    config.headers['x-diplomat-routed'] = 'true';
    config.headers['x-diplomat-version'] = diplomatVersion;
    // Preserve correlationId for response logging
    if (correlationId) {
      config.headers['correlation-id'] = correlationId;
    }

    // CRITICAL: Override Content-Type to application/json for diplomat-server request
    // Original Content-Type (e.g., application/x-www-form-urlencoded) was for the target system
    // and is preserved in originalHeaders to be sent to target via options.headers
    // Without this, axios will URL-encode the object instead of JSON.stringify it, causing
    // diplomat-server to receive malformed data and return 400 invalid_json
    config.headers['Content-Type'] = 'application/json';

    return config;
  } catch (error) {
    // On any error, fall back to direct routing
    return config;
  }
}

/**
 * Response interceptor for diplomat routing.
 * Decodes base64 response and extracts status/headers from diplomat response.
 */
function diplomatResponseInterceptor(response: AxiosResponse): AxiosResponse {
  // Check if this was a diplomat-routed request
  const isDiplomatRouted = response.config?.headers?.['x-diplomat-routed'] === 'true';

  if (!isDiplomatRouted) {
    // Not a diplomat request - pass through
    return response;
  }

  // Extract correlationId for logging
  const correlationId = response.config?.headers?.['correlation-id'] as string | undefined;
  const installId = response.config?.headers?.['x-envoy-install-id'] as string | undefined;
  const diplomatVersion = response.config?.headers?.['x-diplomat-version'] as string | undefined;

  const contextLogger = logger.child({
    install_id: installId,
    correlation_id: correlationId,
    diplomat_version: diplomatVersion,
  });

  try {
    contextLogger.debug('Received response from diplomat server', {
      diplomat_server_status: response.status,
      diplomat_server_statusText: response.statusText,
    });

    const diplomatResponse = response.data as DiplomatServerResponse;

    if (isDiplomatLatestResponse(diplomatResponse)) {
      // Latest format: { status, headers, body }
      const decodedBody = diplomatResponse.body ? base64ToUtf8(diplomatResponse.body) : '';
      const parsedData = decodedBody ? JSON.parse(decodedBody) : {};

      contextLogger.info('Decoded diplomat latest response', {
        target_status: diplomatResponse.status,
        has_body: !!decodedBody,
      });

      // Return transformed response with actual status code from target system
      const transformedResponse: AxiosResponse = {
        ...response,
        data: parsedData,
        status: diplomatResponse.status,
        statusText: diplomatResponse.status >= 200 && diplomatResponse.status < 300 ? 'OK' : 'Error',
        headers: diplomatResponse.headers,
      };

      // If target system returned error status, throw to match axios behavior
      if (diplomatResponse.status >= 400) {
        contextLogger.warn('Target system returned error status', {
          target_status: diplomatResponse.status,
        });
        const error = new AxiosError(
          `Request failed with status code ${diplomatResponse.status}`,
          `ERR_BAD_RESPONSE`,
          response.config,
          response.request,
          transformedResponse,
        );
        throw error;
      }

      return transformedResponse;
    }
    if (isDiplomatV1Response(diplomatResponse)) {
      // V1 format: { result: { body } }
      const decodedBody = diplomatResponse.result.body ? base64ToUtf8(diplomatResponse.result.body) : '';
      const parsedData = decodedBody ? JSON.parse(decodedBody) : {};

      contextLogger.info('Decoded diplomat v1 response', {
        diplomat_server_status: response.status,
        has_body: !!decodedBody,
      });

      // V1 doesn't return status/headers from target system
      // Normalize to latest format: use diplomat server's 200 status and headers as fallback
      // This ensures plugins can safely access response.status and response.headers
      return {
        ...response,
        status: response.status, // Use diplomat server's status (typically 200)
        statusText: response.statusText,
        headers: response.headers, // Use diplomat server's headers
        data: parsedData,
      };
    }

    // Unknown format - return as-is
    return response;
  } catch (error) {
    // If decoding fails, return original response
    return response;
  }
}

/**
 * Error interceptor for diplomat routing.
 * Handles errors from diplomat-routed requests.
 */
function diplomatErrorInterceptor(error: AxiosError): Promise<never> {
  // Check if this was a diplomat-routed request
  const isDiplomatRouted = error.config?.headers?.['x-diplomat-routed'] === 'true';

  if (isDiplomatRouted && error.response) {
    // Try to decode diplomat error response
    try {
      const diplomatResponse = error.response.data as DiplomatServerResponse;

      if (isDiplomatLatestResponse(diplomatResponse)) {
        const decodedBody = diplomatResponse.body ? base64ToUtf8(diplomatResponse.body) : '';
        const parsedData = decodedBody ? JSON.parse(decodedBody) : {};

        // Update error with decoded data and actual status
        error.response.data = parsedData;
        error.response.status = diplomatResponse.status;
        error.response.headers = diplomatResponse.headers;
      } else if (isDiplomatV1Response(diplomatResponse)) {
        const decodedBody = diplomatResponse.result.body ? base64ToUtf8(diplomatResponse.result.body) : '';
        const parsedData = decodedBody ? JSON.parse(decodedBody) : {};

        // Normalize v1 error response to latest format
        error.response.data = parsedData;
        // V1 doesn't provide target system status/headers, so keep diplomat server's values
        // This matches the success response normalization
      } else {
        // Response data doesn't match diplomat format - it was already decoded by response interceptor
        // Don't sanitize these errors as they already have the correct structure
        return Promise.reject(error);
      }
    } catch (decodeError) {
      // If decoding fails, keep original error
    }
  }

  return Promise.reject(sanitizeAxiosError(error));
}

export function createAxiosClient(config?: AxiosRequestConfig | undefined): AxiosInstance {
  const client = axios.create(config);

  // Add diplomat request interceptor
  client.interceptors.request.use(diplomatRequestInterceptor, (error) => Promise.reject(error));

  // Add diplomat response interceptor
  client.interceptors.response.use(diplomatResponseInterceptor, diplomatErrorInterceptor);

  return client;
}
