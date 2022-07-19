const EnvoyAPI = require('../EnvoyAPI');

describe('EnvoyAPI.login()', () => {
    let accessTokenObject = null;

    beforeAll(async () => {
        accessTokenObject = await EnvoyAPI.login();
        return accessTokenObject;
    })
    
    describe('On Success', () => {
        it('should login with client credentials and return an access token', async ()=> {
            expect(accessTokenObject).toHaveProperty('access_token', expect.any(String));
        })
    
        it('should return object with property, token_type: "Bearer"', async () => {
            expect(accessTokenObject).toHaveProperty('token_type', 'Bearer');
        })
    
        it('should return object with property, expires_in', async () => {
            expect(accessTokenObject).toHaveProperty('expires_in', expect.any(Number));
        })
    
        it('should return object with property, refresh_token', async () => {
            expect(accessTokenObject).toHaveProperty('refresh_token', expect.any(String));
        })
    
        it('should return object with property, refresh_token_expires_in', async () => {
            expect(accessTokenObject).toHaveProperty('refresh_token_expires_in', expect.any(Number));
        })
    
        it('should have company_id', async () => {
            expect(accessTokenObject).toHaveProperty('company_id', expect.any(String));
        })
    })

    describe('On failure', () => {
        beforeAll(async () => {
            process.env.ENVOY_CLIENT_ID = 'Fail ID';
            try {
                accessTokenObject = await EnvoyAPI.login();
            } catch (err) {
                accessTokenObject = err;
            }
            return accessTokenObject;
        })

        it('should return a StatusCodeError', async ()=> {
            expect(accessTokenObject.name).toBe('StatusCodeError');
        })

        it('should return statusCode: 401', async ()=> {
            expect(accessTokenObject.statusCode).toBe(401);
        })
    })

})