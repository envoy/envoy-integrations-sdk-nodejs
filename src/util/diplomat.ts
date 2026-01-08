import axios, { AxiosError, AxiosResponse } from 'axios';
import { splitClient } from './splitClient';
import { rootLogger } from './logger';

const logger = rootLogger.child({ source: 'diplomat-sdk' });

/**
 * Diplomat Latest Response Format (current)
 */
export type DiplomatServerResponseLatest = {
  status: number; // HTTP status code from target system
  headers: { [key: string]: string[] }; // Response headers from target system
  body: string; // base64-encoded response body
};

/**
 * Diplomat V1 Response Format (legacy)
 */
export type DiplomatServerResponseV1 = {
  result: {
    body: string; // base64-encoded response body
  };
};

/**
 * Union type for diplomat server responses
 */
export type DiplomatServerResponse = DiplomatServerResponseLatest | DiplomatServerResponseV1;

/**
 * Response from diplomat server's /clients/enabled endpoint
 */
export type DiplomatClientEnabledResponse = {
  plugin_install_id: string;
  client_id: string;
  enabled: boolean;
  internal_url: string;
};

/**
 * Feature flag name for diplomat v1 routing
 */
export const SPLIT_TREATMENT_ENABLE_DIPLOMAT_V1_ROUTING = 'enable-diplomat-v1-routing';

/**
 * Check if diplomat v1 routing is enabled for a given installId
 */
export function useDiplomatV1Routing(installId: string): boolean {
  try {
    const treatment = splitClient.getTreatment(installId, SPLIT_TREATMENT_ENABLE_DIPLOMAT_V1_ROUTING);
    return treatment === 'on';
  } catch (err) {
    // Default to latest on error
    return false;
  }
}

/**
 * Type guard to check if response is V1 format
 */
export function isDiplomatV1Response(response: DiplomatServerResponse): response is DiplomatServerResponseV1 {
  return 'result' in response && 'body' in response.result;
}

/**
 * Type guard to check if response is Latest format
 */
export function isDiplomatLatestResponse(
  response: DiplomatServerResponse,
): response is DiplomatServerResponseLatest {
  return 'status' in response && 'headers' in response && 'body' in response;
}

/**
 * Check if diplomat routing is enabled for a given plugin installation.
 *
 * NOTE: Currently no caching - calls diplomat-server on every check.
 * This will be optimized with caching in a future iteration.
 *
 * @param installId - The plugin installation ID
 * @returns Diplomat configuration if enabled, null otherwise
 */
export async function getDiplomatClientInstall(installId?: string): Promise<DiplomatClientEnabledResponse | null> {
  if (!installId) {
    return null;
  }

  // Check if v1 routing is enabled
  const useV1 = useDiplomatV1Routing(installId);
  const serverUrlEnvVar = useV1 ? 'DIPLOMAT_SERVER_V1_URL' : 'DIPLOMAT_SERVER_URL';
  const serverUrl = process.env[serverUrlEnvVar];
  const diplomatVersion = useV1 ? 'v1' : 'latest';

  // Check environment variables
  if (!serverUrl) {
    logger.debug('Diplomat routing disabled - server URL not configured', {
      install_id: installId,
      diplomat_version: diplomatVersion,
      env_var: serverUrlEnvVar,
    });
    return null;
  }

  if (!process.env.DIPLOMAT_SERVER_AUTH_USERNAME || !process.env.DIPLOMAT_SERVER_AUTH_PASSWORD) {
    logger.debug('Diplomat routing disabled - credentials not configured', {
      install_id: installId,
      diplomat_version: diplomatVersion,
    });
    return null;
  }

  try {
    const requestUrl = `/clients/enabled?plugin_install_id=${installId}`;

    const axiosClient = axios.create({
      baseURL: serverUrl,
      auth: {
        username: process.env.DIPLOMAT_SERVER_AUTH_USERNAME,
        password: process.env.DIPLOMAT_SERVER_AUTH_PASSWORD,
      },
    });

    const response: AxiosResponse<DiplomatClientEnabledResponse> = await axiosClient.get(requestUrl);

    logger.debug('Diplomat configuration check successful', {
      install_id: installId,
      diplomat_version: diplomatVersion,
      diplomat_enabled: response.data.enabled,
      client_id: response.data.client_id,
    });

    return response.data;
  } catch (err: unknown) {
    // Log the error but return null to fall back to direct routing
    if (axios.isAxiosError(err)) {
      logger.warn('Diplomat server check failed - falling back to direct routing', {
        install_id: installId,
        diplomat_version: diplomatVersion,
        diplomat_server_url: serverUrl,
        status_code: err.response?.status,
        error_message: err.message,
        error_code: err.code,
      });
    } else {
      logger.warn('Diplomat server check failed - falling back to direct routing', {
        install_id: installId,
        diplomat_version: diplomatVersion,
        diplomat_server_url: serverUrl,
        error_message: err instanceof Error ? err.message : String(err),
      });
    }

    return null;
  }
}

/**
 * Utility functions for base64 encoding/decoding
 */
export function utf8ToBase64(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64');
}

export function base64ToUtf8(str: string): string {
  return Buffer.from(str, 'base64').toString('utf-8');
}
