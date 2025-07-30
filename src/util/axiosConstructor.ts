import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ensureError } from './errorHandling';
import { 
  getDiplomatConfigFromEnv, 
  shouldUseDiplomat, 
  routeThroughDiplomat,
  getDiplomatClientInstall,
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
  
  // Get diplomat configuration from environment
  const diplomatConfig = getDiplomatConfigFromEnv();
  
  // Add request interceptor to handle diplomat routing
  client.interceptors.request.use(
    async (requestConfig) => {
      // Check if we should route through diplomat
      if (!shouldUseDiplomat(requestConfig, diplomatConfig)) {
        return requestConfig;
      }

      let diplomatClientInstall: DiplomatClientInstall | null = null;

      // Try to get diplomat client install info
      if (config?.installId) {
        // Automatic diplomat client install fetching using installId
        try {
          diplomatClientInstall = await getDiplomatClientInstall(config.installId, diplomatConfig!);
        } catch (error) {
          console.warn('Failed to get diplomat client install info:', error);
        }
      } else if (config?.getDiplomatClientInstall) {
        // Custom function for advanced use cases
        try {
          diplomatClientInstall = await config.getDiplomatClientInstall();
        } catch (error) {
          console.warn('Failed to get diplomat client install info:', error);
        }
      } else if (config?.diplomatClientInstall) {
        // Static diplomat client install info
        diplomatClientInstall = config.diplomatClientInstall;
      } else if (diplomatConfig?.clientId && diplomatConfig?.internalUrl) {
        // Use config from environment variables
        diplomatClientInstall = {
          enabled: true,
          client_id: diplomatConfig.clientId,
          internal_url: diplomatConfig.internalUrl,
        };
      }

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
