const axios = require('axios');
const EnvoyAPI = require('../lib/EnvoyAPI');

describe('axios', () => {
    it('default client should leak credentials in error', async () => {
        const client = axios.create({
            family: 4,
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        try {
            await client.get('http://localhost:3000/axios-error');
        } catch (error) {
            expect(error.config).toBeDefined();
            const errorStr = JSON.stringify(error);
            expect(errorStr).toContain('Bearer 1234');
        }
    });

    it('should sanitize requests error response', async () => {
        const client = axios.create({
            family: 4,
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        try {
            await client.get('http://localhost:3000/axios-error').catch(EnvoyAPI.safeRequestsError);
        } catch (error) {
            expect(error.config).toBeUndefined();
            expect(error.message).toBe('Error: connect ECONNREFUSED 127.0.0.1:3000');
            expect(error.name).toBe('RequestError');
            const errorStr = JSON.stringify(error);
            expect(errorStr).not.toContain('Bearer 1234');
        }
    });

    it('should return rejected promise and leak credentials', () => {
        const client = axios.create({
            family: 4,
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        const response = client.get('http://localhost:3000/axios-error');
        response.then((data) => {
            expect(false).toBe(true);
        }).catch((error) => {
            expect(error.config).toBeDefined();
            const errorStr = JSON.stringify(error);
            expect(errorStr).toContain('Bearer 1234');
        });
    });

    it('should return rejected promise', () => {
        const client = axios.create({
            family: 4,
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        const response = client.get('http://localhost:3000/axios-error').catch(EnvoyAPI.safeRequestsError);
        response.then((data) => {
            expect(false).toBe(true);
        }).catch((error) => {
            expect(error.message).toBe('Error: connect ECONNREFUSED 127.0.0.1:3000');
            expect(error.name).toBe('RequestError');
            const errorStr = JSON.stringify(error);
            expect(errorStr).not.toContain('Bearer 1234');
        });
    });

    it('should make a successful request', async () => {
        const response = await axios.get('https://httpstatuses.maor.io/200', { family: 4 }).then(res => res.data).catch(EnvoyAPI.safeRequestsError);
        expect(response.code).toBe(200);
        expect(response.description).toBe('OK');
    });

    it('should throw an error', async () => {
        try {
            await axios.get('https://httpstatuses.maor.io/500', { family: 4 }).catch(EnvoyAPI.safeRequestsError);
        } catch (error) {
            expect(error.message).toContain('500');
            expect(error.message).toContain('Internal Server Error');
        }
    });
});