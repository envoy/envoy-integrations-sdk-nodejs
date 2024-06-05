import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ensureError } from './errorHandling';

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

export function createAxiosClient(config?: AxiosRequestConfig | undefined): AxiosInstance {
  const client = axios.create(config);
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(sanitizeAxiosError(error)),
  );

  return client;
}
