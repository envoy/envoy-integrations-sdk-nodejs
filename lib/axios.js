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
                message: error.message,
                name: error.name,
                baseURL: error.request.baseURL ?? error.config.baseURL,
                url: error.request.url ?? error.config.url,
                method: error.request.method ?? error.config.method,
            }
            return Promise.reject(safeError);
        },
    );

    return client;
}

module.exports = createAxiosClient;