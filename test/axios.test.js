const axios = require('axios');
const createClient = require('../lib/axios');

describe('axios', () => {
    it('default client should leak credentials in AxiosError', async () => {
        const client = axios.create({
            headers: {
                Authorization: 'Bearer 1234',
            },
            proxy: {
                host: 'localhost',
                auth: {
                    username: 'myWhackyUsername',
                    password: 'myWhackyPassword',
                }
            }
        });
        try {
            await client.get('http://localhost:3000/axios-error');
        } catch (error) {
            expect(error.config).toBeDefined();
            const errorStr = JSON.stringify(error);
            expect(errorStr).toContain('Bearer 1234');
            expect(errorStr).toContain('myWhackyUsername');
            expect(errorStr).toContain('myWhackyPassword');
        }
    });

    it('should sanitize AxiosError response', async () => {
        const client = createClient({
            headers: {
                Authorization: 'Bearer 1234',
            },
            proxy: {
                host: 'localhost',
                auth: {
                    username: 'myWhackyUsername',
                    password: 'myWhackyPassword',
                }
            }
        });
        try {
            await client.get('http://localhost:3000/axios-error');
        } catch (error) {
            expect(error.config).toBeUndefined();
            expect(error.code).toBe('ECONNREFUSED');
            expect(error.message).toBe('connect ECONNREFUSED 127.0.0.1:80');
            expect(error.name).toBe('Error');
            expect(error.url).toBe('http://localhost:3000/axios-error');
            expect(error.method).toBe('get');
            const errorStr = JSON.stringify(error);
            expect(errorStr).not.toContain('Bearer 1234');
            expect(errorStr).not.toContain('myWhackyUsername');
            expect(errorStr).not.toContain('myWhackyPassword');
        }
    });
});