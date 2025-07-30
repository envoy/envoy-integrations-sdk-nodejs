import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createAxiosClient } from './axiosConstructor';

// Base64 encoding utilities (from Kantech implementation)
function utf8ToBase64(str: string | undefined): string | undefined {
  if (!str) return undefined;
  return Buffer.from(str, 'utf8').toString('base64');
}

function base64toUtf8(str: string | undefined): string | undefined {
  if (!str) return undefined;
  return Buffer.from(str, 'base64').toString('utf8');
}

// Diplomat configuration interface
export interface DiplomatConfig {
  enabled: boolean;
  serverUrl: string;
  authUsername: string;
  authPassword: string;
  clientId?: string;
  internalUrl?: string;
}

// Diplomat client install interface (matches Kantech's getDiplomatClientInstall response)
export interface DiplomatClientInstall {
  enabled: boolean;
  client_id: string;
  internal_url: string;
}

/**
 * Infers the diplomat server URL based on the current environment
 */
function inferDiplomatServerUrl(): string {
  // Check for explicit environment indicators
  if (process.env.NODE_ENV === 'production' || 
      process.env.ENVIRONMENT === 'production' ||
      process.env.ENV === 'production') {
    return 'https://diplomat-server.envoy.com';
  }
  
  // Default to staging for all other environments (development, staging, test, etc.)
  return 'https://diplomat-server.envoy.christmas';
}

/**
 * Gets diplomat configuration from environment variables
 */
export function getDiplomatConfigFromEnv(): DiplomatConfig | null {
  const enabled = process.env.DIPLOMAT_ENABLED === 'true';
  const serverUrl = inferDiplomatServerUrl();
  const authUsername = process.env.DIPLOMAT_SERVER_AUTH_USERNAME;
  const authPassword = process.env.DIPLOMAT_SERVER_AUTH_PASSWORD;

  if (!enabled || !authUsername || !authPassword) {
    return null;
  }

  return {
    enabled,
    serverUrl,
    authUsername,
    authPassword,
    clientId: process.env.DIPLOMAT_CLIENT_ID,
    internalUrl: process.env.DIPLOMAT_INTERNAL_URL,
  };
}

/**
 * Creates an axios client configured for diplomat server communication
 */
function createDiplomatAxiosClient(config: DiplomatConfig): AxiosInstance {
  return createAxiosClient({
    baseURL: config.serverUrl,
    auth: {
      username: config.authUsername,
      password: config.authPassword,
    },
    timeout: 30000, // 30 second timeout for diplomat requests
  });
}

/**
 * Routes an HTTP request through the diplomat tunnel
 */
export async function routeThroughDiplomat(
  config: AxiosRequestConfig,
  diplomatConfig: DiplomatConfig,
  diplomatClientInstall?: DiplomatClientInstall
): Promise<AxiosResponse> {
  if (!diplomatClientInstall || !diplomatClientInstall.enabled) {
    throw new Error('Diplomat client install not available or not enabled');
  }

  const diplomatClient = createDiplomatAxiosClient(diplomatConfig);
  
  // Convert the original request to a diplomat task
  const taskConfig = {
    url: `/clients/${diplomatClientInstall.client_id}/tasks`,
    method: 'POST',
    data: {
      handler: 'http',
      options: {
        method: config.method?.toUpperCase() || 'GET',
        url: diplomatClientInstall.internal_url + (config.url || ''),
        params: config.params,
        timeout: config.timeout || 30000,
        headers: config.headers || {},
        body: utf8ToBase64(typeof config.data === 'string' ? config.data : JSON.stringify(config.data)),
      },
    },
  };

  console.log(`Routing request through diplomat: ${JSON.stringify(taskConfig)}`);
  
  try {
    const response = await diplomatClient(taskConfig);
    console.log(`Diplomat response received: ${JSON.stringify(response?.data?.result)}`);
    
    // Transform the diplomat response back to a standard axios response
    const result = response.data?.result;
    if (!result) {
      throw new Error('Invalid diplomat response: missing result');
    }

    return {
      data: result.body ? base64toUtf8(result.body) : result.data,
      status: result.status || 200,
      statusText: result.statusText || 'OK',
      headers: result.headers || {},
      config: config,
      request: response.request,
    } as AxiosResponse;
  } catch (error) {
    console.error(`Diplomat routing failed:`, error);
    throw error;
  }
}

/**
 * Determines if a request should be routed through diplomat
 */
export function shouldUseDiplomat(
  config: AxiosRequestConfig,
  diplomatConfig: DiplomatConfig | null
): boolean {
  if (!diplomatConfig || !diplomatConfig.enabled) {
    return false;
  }

  // Don't route requests to the diplomat server itself to avoid loops
  if (config.baseURL === diplomatConfig.serverUrl || config.url?.includes(diplomatConfig.serverUrl)) {
    return false;
  }

  return true;
}