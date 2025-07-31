import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Cache for supported plugin IDs (loaded once per SDK instance)
let supportedPluginsCache: Set<string> | null = null;

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
  pluginId?: string;
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
  const serverUrl = inferDiplomatServerUrl();
  const authUsername = process.env.DIPLOMAT_SERVER_AUTH_USERNAME;
  const authPassword = process.env.DIPLOMAT_SERVER_AUTH_PASSWORD;

  if (!authUsername || !authPassword) {
    return null;
  }

  return {
    enabled: true, // Always enabled if credentials are provided
    serverUrl,
    authUsername,
    authPassword,
    clientId: process.env.DIPLOMAT_CLIENT_ID,
    internalUrl: process.env.DIPLOMAT_INTERNAL_URL,
    pluginId: process.env.DIPLOMAT_PLUGIN_ID,
  };
}

/**
 * Fetches diplomat client install info from diplomat server
 */
export async function getDiplomatClientInstall(installId: string, diplomatConfig: DiplomatConfig): Promise<DiplomatClientInstall | null> {
  if (!installId || !diplomatConfig) {
    return null;
  }

  console.log('Pulling diplomat client install', {
    installId,
    url: `${diplomatConfig.serverUrl}/clients/enabled?plugin_install_id=${installId}`,
  });

  try {
    const axiosClient = createDiplomatAxiosClient(diplomatConfig);
    const response = await axiosClient.get(`/clients/enabled?plugin_install_id=${installId}`);
    console.log(`returning ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (err) {
    console.warn('Error while pulling diplomat install', { err });
    return null;
  }
}

/**
 * Creates an axios client configured for diplomat server communication
 * Uses plain axios to avoid circular dependency with createAxiosClient
 */
function createDiplomatAxiosClient(config: DiplomatConfig): AxiosInstance {
  return axios.create({
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
 * Loads supported plugins once and caches them
 */
async function loadSupportedPlugins(diplomatConfig: DiplomatConfig): Promise<void> {
  if (supportedPluginsCache !== null) return;
  
  try {
    const axiosClient = createDiplomatAxiosClient(diplomatConfig);
    const response = await axiosClient.get('/plugins/supported');
    supportedPluginsCache = new Set(response.data.plugins.map((p: any) => p.id));
  } catch (error) {
    console.warn('Failed to load supported plugins, disabling diplomat for all plugins:', error);
    supportedPluginsCache = new Set(); // Empty = no plugins supported
  }
}

/**
 * Checks if plugin supports diplomat
 */
export function isPluginSupported(pluginId: string): boolean {
  return supportedPluginsCache?.has(pluginId) ?? false;
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

/**
 * Initialize diplomat with plugin validation
 */
export async function initializeDiplomat(diplomatConfig: DiplomatConfig): Promise<boolean> {
  await loadSupportedPlugins(diplomatConfig);
  return diplomatConfig.pluginId ? isPluginSupported(diplomatConfig.pluginId) : true;
}