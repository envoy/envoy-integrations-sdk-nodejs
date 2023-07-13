import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export function createAxiosClient(config?: AxiosRequestConfig | undefined): AxiosInstance {
    const client = axios.create(config);
    client.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(sanitizeAxiosError(error));
    });

    return client;
}

export function sanitizeAxiosError(error: any) {
    const safeError = {
        code: error.code,
        request: {
            baseURL: error.request?.baseURL,
            url: error.request?.url,
            method: error.request?.method,
        },
        response: {
            code: error.response?.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
        },
        message: error.message,
        name: error.name,
        baseURL: error.request?.baseURL ?? error.config?.baseURL,
        url: error.request?.url ?? error.config?.url,
        method: error.request?.method ?? error.config?.method,
        stack: error.stack,
        data: error.data,
    };
    return safeError;
}