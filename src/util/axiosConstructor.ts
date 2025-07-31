import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ensureError } from './errorHandling';
import { 
  getDiplomatConfigFromEnv, 
  shouldUseDiplomat, 
  routeThroughDiplomat,
  getDiplomatClientInstall,
  initializeDiplomat,
  DiplomatClientInstall 
} from './diplomatRouting';

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

export interface DiplomatEnabledAxiosConfig extends AxiosRequestConfig {
  // Plugin install ID for automatic diplomat client install fetching
  installId?: string;
  // Optional function to get diplomat client install info (for advanced use cases)
  getDiplomatClientInstall?: () => Promise<DiplomatClientInstall | null>;
  // Or provide static diplomat client install info
  diplomatClientInstall?: DiplomatClientInstall;
}

export function createAxiosClient(config?: DiplomatEnabledAxiosConfig): AxiosInstance {
  const client = axios.create(config);
  const diplomatConfig = getDiplomatConfigFromEnv();
  
  // Simple cache for this axios instance
  let cachedDiplomatClientInstall: DiplomatClientInstall | null = null;
  let isDiplomatSupported: boolean | null = null;
  
  // Add request interceptor to handle diplomat routing
  client.interceptors.request.use(
    async (requestConfig) => {
      if (!shouldUseDiplomat(requestConfig, diplomatConfig)) {
        return requestConfig;
      }

      // Check plugin support once
      if (isDiplomatSupported === null) {
        isDiplomatSupported = await initializeDiplomat(diplomatConfig!);
        if (!isDiplomatSupported) return requestConfig;
      }

      let diplomatClientInstall: DiplomatClientInstall | null = null;

      // Get diplomat client install (cached after first call)
      if (cachedDiplomatClientInstall === null) {
        if (config?.installId) {
          cachedDiplomatClientInstall = await getDiplomatClientInstall(config.installId, diplomatConfig!);
        } else if (config?.getDiplomatClientInstall) {
          cachedDiplomatClientInstall = await config.getDiplomatClientInstall();
        } else if (config?.diplomatClientInstall) {
          cachedDiplomatClientInstall = config.diplomatClientInstall;
        } else if (diplomatConfig?.clientId && diplomatConfig?.internalUrl) {
          cachedDiplomatClientInstall = {
            enabled: true,
            client_id: diplomatConfig.clientId,
            internal_url: diplomatConfig.internalUrl,
          };
        }
      }
      diplomatClientInstall = cachedDiplomatClientInstall;

      // If we have diplomat client install info, route through diplomat
      if (diplomatClientInstall && diplomatClientInstall.enabled) {
        console.log('Routing request through diplomat tunnel');
        try {
          const diplomatResponse = await routeThroughDiplomat(requestConfig, diplomatConfig!, diplomatClientInstall);
          // Create a fake axios request that will return the diplomat response
          return {
            ...requestConfig,
            adapter: () => Promise.resolve(diplomatResponse),
          } as any;
        } catch (error) {
          console.warn('Diplomat routing failed, falling back to direct request:', error);
          // Fall back to direct request
        }
      }

      return requestConfig;
    },
    (error) => Promise.reject(sanitizeAxiosError(error))
  );

  // Add response interceptor for error sanitization
  client.interceptors.response.use(
    (response) => response, // Pass through all responses unchanged
    (error) => Promise.reject(sanitizeAxiosError(error)),
  );

  return client;
}
