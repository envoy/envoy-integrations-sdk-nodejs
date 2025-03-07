const { AxiosError } = require('axios');
const axios = require('axios');

function createAxiosClient(config) {
    const client = axios.create(config);
    client.interceptors.response.use(
        (response) => {
           return response 
        },
        (error) => {
            const safeError = {
                code: error.code,
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
            }
            return Promise.reject(safeError);
        },
    );

    return client;
}

module.exports = createAxiosClient;