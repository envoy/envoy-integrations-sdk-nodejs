const axios = require('axios');
const createClient = require('../lib/axios')

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
            expect(error.config.headers).toBeDefined();
            expect(error.config.proxy).toBeDefined();
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
            expect(error.config.headers).toBeUndefined();
            expect(error.config.proxy).toBeUndefined();
            const errorStr = JSON.stringify(error);
            expect(errorStr).not.toContain('Bearer 1234');
            expect(errorStr).not.toContain('myWhackyUsername');
            expect(errorStr).not.toContain('myWhackyPassword');
        }
    });
});