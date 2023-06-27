const { AxiosError } = require('axios');
const axios = require('axios');

function createClient(config) {
    const client = axios.create(config);
    client.interceptors.response.use(
        (response) => {
           return response 
        },
        (error) => {
            // if the response class type is AxiosError, scrub config fields containing sensitive data
            if (error instanceof AxiosError) {
                delete error.config.headers;
                delete error.config.proxy;
            }
            return Promise.reject(error);
        },
    );

    return client;
}

module.exports = createClient;