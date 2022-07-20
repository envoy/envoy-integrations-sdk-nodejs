const EnvoyAPI = require('../EnvoyAPI');
const request = require('request');
// const { expect } = require('chai');
let envoy = null;
let envoyNoScopes = null;

const TOKEN_SCOPE = [
    'token.refresh',
    'locations.read',
    'companies.read',
    'flows.read',
    'invites.read',
    'invites.write',
    'employees.read',
    'reservations.read',
    'reservations.write',
    'spaces.read',
    'work-schedules.read',
    'work-schedules.write',
]

/** 
 * Get an access token generated from ENVOY_CLIENT_ID and ENVOY_CLIENT_SECRET provided from env file. 
 * Or use ENVOY_CLIENT_API_KEY which is currently in beta testing. 
 * Also see scopes here: https://developers.envoy.com/hub/docs/scopes#access-scopes for optional list of permissions for the token.
 */

async function getAccessToken(id = process.env.ENVOY_CLIENT_ID, secret = process.env.ENVOY_CLIENT_SECRET) {
    const baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return request({
        auth: {
            user: id,
            pass: secret,
        },
        json: true,
        method: 'POST',
        body: {
            grant_type: 'client_credentials',
            client_id: id,
            client_secret: secret,
            scope: TOKEN_SCOPE.join(),
        },
        url: '/a/auth/v0/token',
        baseUrl,
    });
}

describe('EnvoyAPI.login()', () => {
    let accessTokenObject = null;

    beforeAll(async () => {
        accessTokenObject = await EnvoyAPI.login();
        return accessTokenObject;
    })

    describe('On Success', () => {
        it('should login with client credentials and return an access token', async () => {
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

    describe('On Incorrect Credentials', () => {
        beforeAll(async () => {
            try {
                accessTokenObject = await EnvoyAPI.login('Fail Id');
            } catch (err) {
                accessTokenObject = err;
            }
            return accessTokenObject;
        })

        it('should return a StatusCodeError', async () => {
            expect(accessTokenObject.name).toBe('StatusCodeError');
        })

        it('should return statusCode: 401', async () => {
            expect(accessTokenObject.statusCode).toBe(401);
        })
    })
})

describe('EnvoyAPI Instantiation', () => {
    beforeAll(async () => {
        let accessToken = await getAccessToken();
        // console.log(accessToken.access_token);
        envoy = new EnvoyAPI(accessToken.access_token);
    })

    it('should return an EnvoyAPI class', () => {
        expect(envoy).toHaveProperty('token', expect.any(String));
    })

    it('should throw "Error: No token supplied." when no tokens are supplied', async () => {
        let noTokenEnvoy = null;
        try {
            noTokenEnvoy = new EnvoyAPI();
        } catch (err) {
            noTokenEnvoy = err;
        }

        expect(noTokenEnvoy.message).toBe('No token supplied.');
    })
})

describe('EnvoyAPI methods', () => {    
    describe('Locations', () => {
        let locations = null;
        let location = null;

        beforeAll(async () => {
            locations = await envoy.locations();
            location = await envoy.location(143497);
        })

        it('should return all locations for a company', () => {
            expect(locations[0].id).toEqual(expect.any(String));
        })

        it('should have our test location id equal to 143497', () => {
            expect(locations[0].id).toEqual('143497');
        })

        // Add Test for no scopes 

        it('should return a location given an id', () => {
            expect(location.id).toEqual('143497');
        })
    })

    describe('Flows', () => {
        let flows = null;
        let flow = null; 

        beforeAll(async () => {
            flows = await envoy.flows(143497);
            // flow = await envoy.flow();
        })

        it('should return all visitor flows given a location id', () => {
            console.log(flows);
        })
    })
})  
