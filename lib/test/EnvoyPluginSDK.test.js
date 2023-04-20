const EnvoyAPI = require('../EnvoyAPI');
const EnvoyPluginSDK = require('../EnvoyPluginSDK');
const EnvoyPluginStorage = require('../EnvoyPluginStorage');
const EnvoyPluginJob = require('../EnvoyPluginJob');
const EnvoyJWT = require('../EnvoyJWT');

const INSTALL_ID = process.env.ENVOY_INSTALL_ID;
const META = {
    route: 'step-0-callback',
    plugin_id: process.env.ENVOY_PLUGIN_ID,
    install_id: INSTALL_ID,
    env: { complete: 'completed' },
    config: { complete: 'completed' },
    params: { configure_step: 0 },
    // forwarded_bearer_token: '',
    // auth: {
    //   token_type: 'Bearer',
    //   access_token: '',
    //   expires_in: 86400,
    //   refresh_token: null,
    //   refresh_token_expires_in: null,
    //   state: null,
    //   company_id: '110090'
    // },
    location: {
        id: '143497',
        type: 'locations',
        attributes: {
            name: 'HQ',
            'company-name-override': null,
            'time-zone': 'America/Los_Angeles',
            timezone: 'America/Los_Angeles',
            locale: 'en',
            address: '12319 Julie Ln, Saratoga, CA 95070, USA',
            'address-line-one': '12319 Julie Lane',
            'address-line-two': null,
            city: 'Saratoga',
            state: 'CA',
            country: 'US',
            zip: '95070',
            longitude: -122.033804,
            latitude: 37.290455,
            'created-at': '2021-10-08T20:44:50.584Z'
        },
        relationships: { company: [Object] }
    },
    company: {
        id: '110090',
        type: 'companies',
        attributes: {
            name: 'Test Company 1',
            'plan-intent': 'enterprise',
            'buy-intent': false,
            active: true,
            'created-at': '2021-10-08T20:44:50.550Z'
        }
    },
    job: {
        id: 123
    }
}

const BODY = {
    meta: META,
    payload: {
        'hello': 'world',
    }
}

describe('EnvoyPluginSDK()', () => {
    let envoy = null;
    let pluginAccessToken = null;
    // Bad PluginSDK with invalid meta
    let badEnvoyPlugin = null; 
    // Bad PluginSDK with valid meta
    let badMeta = null 

    beforeAll(async () => {
        let tokens = await EnvoyAPI.loginAsPluginInstaller(INSTALL_ID);
        let accessToken = await EnvoyAPI.login()
        BODY.meta.forwarded_bearer_token = accessToken.access_token;
        BODY.meta.auth = accessToken;
        pluginAccessToken = tokens.access_token;

        // Create EnvoyPluginSDK instance
        envoy = new EnvoyPluginSDK(BODY, true, pluginAccessToken);
        badEnvoyPlugin = new EnvoyPluginSDK(
            {
                meta: {},
                payload: {
                    'hello': 'world',
                }
            },
            true,
        );
        badMeta = new EnvoyPluginSDK({}, false);
    });

    it('should create new instance of EnvoyPluginSDK', async () => {

        expect(envoy instanceof EnvoyPluginSDK).toBe(true);
        expect(envoy.pluginAccessToken).toEqual(pluginAccessToken);
    });

    describe('get meta', () => {
        it('should return meta', () => {
            let metaInstall = envoy.meta.install_id;
            expect(metaInstall).toEqual(INSTALL_ID);
        });

        it('should throw an error if meta is not verified', () => {
            let inval = null;

            try {
                badMeta.meta;
            } catch(err) {
                inval  = err.message;
            }
            expect(inval).toEqual('Could not verify meta.')
        }) 
    });

    describe('get payload', () => {
        it('should return payload', () => {
            let payload = envoy.payload;
            expect(payload.hello).toEqual('world');
        });

        it('should throw an error if meta is not verified', () => {
            let inval = null;
            try {
                badMeta.payload;
            } catch(err) {
                inval  = err.message;
            }
            expect(inval).toEqual('Could not verify payload.')
        }) 
    });

    describe('get userAPI', () => {
        it('should return new instance of EnvoyAPI with the user\'s access token', () => {
            let userAPI = envoy.userAPI;
            expect(userAPI instanceof EnvoyAPI).toBe(true);
        });

        it('should throw an error if API token was not found', () => {
            let inval = null;
            try {
                badEnvoyPlugin.userAPI;
            } catch(err) {
                inval  = err.message;
            }
            expect(inval).toEqual('This user\'s API token was not found. Are you in a route?')
        }) 
    });

    describe('get pluginAPI', () => {
        it('should return new instance of EnvoyAPI instantiated with the plugin access token', () => {
            let pluginAPI = envoy.pluginAPI;
            expect(pluginAPI instanceof EnvoyAPI).toBe(true);
            expect(pluginAPI.token).toEqual(pluginAccessToken)
        });

        it('should throw an error if token was not found', () => {
            let inval = null;
            try {
                badEnvoyPlugin.pluginAPI;
            } catch(err) {
                inval  = err.message;
            }
            expect(inval).toEqual('No API token found. Are your Envoy client ID and secret set?')
        }) 
    });

    describe('get installStorage', () => {
        it('should return new instance of EnvoyPluginStorage', () => {
            let pluginStorage = envoy.installStorage;
            expect(pluginStorage instanceof EnvoyPluginStorage).toBe(true);
            expect(pluginStorage.installId).toEqual(INSTALL_ID);
        });

        it('should throw an error if install id was not found', () => {
            let inval = null;
            try {
                badEnvoyPlugin.installStorage;
            } catch(err) {
                inval  = err.message;
            }
            expect(inval).toEqual('No install ID found in meta.')
        }) 
    });

    describe('get globalStorage', () => {
        it('should return new instance of EnvoyPluginStorage globally scoped across all installs', () => {
            let globalStorage = envoy.globalStorage;
            expect(globalStorage instanceof EnvoyPluginStorage).toBe(true);
        });
    });

    describe('get job', () => {
        it('should get a new instance of EnvoyPluginJob', () => {
            let job = envoy.job;
            expect(job instanceof EnvoyPluginJob).toBe(true);
        });

        it('should throw an error if job is not in meta', () => {
            let inval = null;
            try {
                badEnvoyPlugin.job;
            } catch(err) {
                inval  = err;
            }

            expect(inval).not.toBe(null);
            expect(inval).not.toBe(undefined);
        }) 
    });

    describe('get jobId', () => {
        it('should get job Id', () => {
            expect(envoy.jobId).toEqual(123);
        });
    });

    describe('get jwt', () => {
        it('should get a new instance of EnvoyJWT', () => {
            let jwt = envoy.jwt;
            expect(jwt instanceof EnvoyJWT).toBe(true);
        });

        it('should throw an error if no JWT_SECRET environment variable set', () => {
            let inval = null;
            // Set env variable to empty string
            let jwt = process.env.JWT_SECRET;
            process.env.JWT_SECRET = '';

            try {
                badEnvoyPlugin.jwt;
            } catch(err) {
                inval  = err;
            }

            expect(inval).not.toBe(null);
            expect(inval).not.toBe(undefined);
            // Restore env var
            process.env.JWT_SECRET = jwt;
        }) 
    });

    describe('get getJob', () => { // Not a typo
        it('should get a new instance of EnvoyPluginJob', () => {
            let job = envoy.getJob();
            expect(job instanceof EnvoyPluginJob).toBe(true);
        });
    });

    describe('get getStorage', () => { // Not a typo
        it('should get a new instance of EnvoyPluginStorage', () => {
            let storage = envoy.getStorage();
            expect(storage instanceof EnvoyPluginStorage).toBe(true);
        });
    });
})