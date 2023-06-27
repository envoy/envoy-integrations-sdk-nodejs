import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export function createAxiosClient(config?: CreateAxiosDefaults<any> | undefined): AxiosInstance {
    const client = axios.create(config);
    client.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        delete error.config?.headers;
        delete error.config?.proxy;
        return Promise.reject(error);
    });

    return client;
}