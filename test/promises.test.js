const request = require('../lib/request-wrapper');
const EnvoyAPI = require('../lib/EnvoyAPI');

describe('@cypress/request', () => {
    it('default client should leak credentials in error', async () => {
        const client = request.defaults({
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        try {
            await client('http://localhost:3000/axios-error');
        } catch (error) {
            expect(error.options).toBeDefined();
            const errorStr = JSON.stringify(error);
            expect(errorStr).toContain('Bearer 1234');
        }
    });

    it('should sanitize requests error response', async () => {
        const client = request.defaults({
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        try {
            await client('http://localhost:3000/axios-error').catch(EnvoyAPI.safeRequestsError);
        } catch (error) {
            expect(error.options).toBeUndefined();
            expect(error.message).toBe('Error: connect ECONNREFUSED 127.0.0.1:3000');
            expect(error.name).toBe('RequestError');
            const errorStr = JSON.stringify(error);
            expect(errorStr).not.toContain('Bearer 1234');
        }
    });

    it('should return rejected promise and leak credentials', () => {
        const client = request.defaults({
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        const response = client('http://localhost:3000/axios-error');
        response.then((data) => {
            expect(false).toBe(true);
        }).catch((error) => {
            expect(error.options).toBeDefined();
            const errorStr = JSON.stringify(error);
            expect(errorStr).toContain('Bearer 1234');
        });
    });

    it('should return rejected promise', () => {
        const client = request.defaults({
            headers: {
                Authorization: 'Bearer 1234',
            },
        });
        const response = client('http://localhost:3000/axios-error').catch(EnvoyAPI.safeRequestsError);
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
        const response = await request('https://httpstatuses.maor.io/200').catch(EnvoyAPI.safeRequestsError);
        expect(response).toContain('200');
        expect(response).toContain('OK');
    });

    it('should throw an error', async () => {
        try {
            await request('https://httpstatuses.maor.io/500').catch(EnvoyAPI.safeRequestsError);
        } catch (error) {
            expect(error.message).toContain('500');
            expect(error.message).toContain('Internal Server Error');
        }
    });
});