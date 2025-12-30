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
  // Extract installId from headers
  const installId = config.headers?.['x-envoy-install-id'] as string | undefined;

  if (!installId) {
    // No installId - skip diplomat routing
    return config;
  }

  try {
    // Check if diplomat is enabled for this install
    const diplomatConfig = await getDiplomatClientInstall(installId);

    if (!diplomatConfig || !diplomatConfig.enabled) {
      // Diplomat not enabled - use direct routing
      return config;
    }

    // Check v1 vs latest routing
    const useV1 = useDiplomatV1Routing(installId);
    const serverUrlEnvVar = useV1 ? 'DIPLOMAT_SERVER_V1_URL' : 'DIPLOMAT_SERVER_URL';
    const diplomatServerUrl = process.env[serverUrlEnvVar];

    if (
      !diplomatServerUrl
      || !process.env.DIPLOMAT_SERVER_AUTH_USERNAME
      || !process.env.DIPLOMAT_SERVER_AUTH_PASSWORD
    ) {
      // Missing diplomat server config - use direct routing
      return config;
    }

    // Store original request info for response handling
    const originalBaseURL = config.baseURL || '';
    const originalUrl = config.url || '';
    const originalMethod = config.method || 'GET';
    const originalHeaders = { ...config.headers };
    const originalParams = config.params;

    // Remove x-envoy-install-id from headers sent to target (it's only for SDK routing)
    delete originalHeaders['x-envoy-install-id'];

    // Encode request body as base64
    let encodedBody: string | undefined;
    if (config.data) {
      const dataString = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
      encodedBody = utf8ToBase64(dataString);
    }

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
        baseURL: originalBaseURL || diplomatConfig.internal_url,
        url: originalUrl,
        body: encodedBody,
        headers: originalHeaders,
        params: originalParams,
      },
    };

    // Mark this request as diplomat-routed for response interceptor
    config.headers['x-diplomat-routed'] = 'true';
    config.headers['x-diplomat-version'] = useV1 ? 'v1' : 'latest';

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

  try {
    const diplomatResponse = response.data as DiplomatServerResponse;

    if (isDiplomatLatestResponse(diplomatResponse)) {
      // Latest format: { status, headers, body }
      const decodedBody = diplomatResponse.body ? base64ToUtf8(diplomatResponse.body) : '';
      const parsedData = decodedBody ? JSON.parse(decodedBody) : {};

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
        const error = new Error(`Request failed with status code ${diplomatResponse.status}`) as AxiosError;
        error.response = transformedResponse;
        error.isAxiosError = true;
        throw error;
      }

      return transformedResponse;
    }
    if (isDiplomatV1Response(diplomatResponse)) {
      // V1 format: { result: { body } }
      const decodedBody = diplomatResponse.result.body ? base64ToUtf8(diplomatResponse.result.body) : '';
      const parsedData = decodedBody ? JSON.parse(decodedBody) : {};

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
