const EnvoyAPI = require('../EnvoyAPI');
const request = require('request');
const fs = require('fs');
let envoy = null;
let envoyNoScopes = null;

const TOKEN_SCOPE = [
    'token.refresh',
    'locations.read',
    'companies.read',
    'flows.read',
    'badges.read',
    'invites.read',
    'invites.write',
    'employees.read',
    'employees.write',
    'entries.read',
    'entries.write',
    'agreements.write',
    'reservations.read',
    'reservations.write',
    'spaces.read',
    'work-schedules.read',
    'work-schedules.write',
    'sign-in-fields.read',
    'sign-in-fields.write',
    'sign-in-field-pages.read',
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
        console.log("USING ACCESS TOKEN: ", accessToken.access_token);
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
    // describe('Locations', () => {
    //     let locations = null;
    //     let location = null;

    //     beforeAll(async () => {
    //         locations = await envoy.locations();
    //         location = await envoy.location(143497);
    //     })

    //     it('should return all locations for a company', () => {
    //         expect(locations[0].id).toEqual(expect.any(String));
    //     })

    //     it('should have our test location id equal to 143497', () => {
    //         expect(locations[0].id).toEqual('143497');
    //     })

    //     // Add Test for no scopes 

    //     it('should return a location given an id', () => {
    //         expect(location.id).toEqual('143497');
    //     })
    // })

    // describe('Flows', () => {

    //     it('flows() should return all visitor flows given a location Id', async () => {
    //         let flows = await envoy.flows(143497);
    //         expect(flows[0].id).toEqual('295831');
    //     });

    //     it('flows() should return an empty array if location can\'t be found', async () => {
    //         flows = await envoy.flows(999999);
    //         expect(flows).toEqual([]);
    //     });

    //     it('flow() should return a single flow given a flow Id', async () => {
    //         let flow = await envoy.flow(295831);
    //         expect(flow.id).toEqual('295831');
    //     });

    //     it('flow() should return status code 404 if flow id can\t be found', async () => {
    //         try {
    //             await envoy.flow(999909999);
    //         } catch (err) {
    //             flow = err;
    //         }

    //         expect(flow.statusCode).toEqual(404);
    //     });
    // });

    // describe('Company', () => {
    //     it('companies() should retrieve details for companies scoped to the access token.', async () => {
    //         let company = await envoy.companies();
    //         expect(company[0].id).toEqual('110090');
    //     })
    // });

    // describe('Employees', () => {
    //     it('should return an array of employees scoped to the access token\'s company when no args are provided', async () => {
    //         let employees = await envoy.employees();
    //         expect(employees[0].id).toEqual('94053615');
    //     })

    //     it('should return an employee if an employee ID is passed as an arg', async () => {
    //         let emp = await envoy.employees(96896260);
    //         expect(emp.id).toEqual('96896260');
    //     }) 

    //     it('should return an array of employees when multiple Ids are passed in via the optional params', async () => {
    //         let emp = await envoy.employees({
    //             ids: '96896260,97026819'
    //         });

    //         expect(emp[0].id).toEqual('96896260');
    //         expect(emp[1].id).toEqual('97026819');
    //     });

    //     it('should return employees matching names passed in via the options param', async () => {
    //         let emp = await envoy.employees({
    //             name: 'Full Name'
    //         })
            
    //         expect(emp[0].id).toEqual('96896260');
    //     });

    //     it('should return employees matched via partial names', async () => {
    //         let emp = await envoy.employees({
    //             name: 'Full'
    //         })
            
    //         expect(emp[0].id).toEqual('96896260');
    //     })

    //     it('should return employees by email', async () => {
    //         let emp = await envoy.employees({
    //             email: 'email@example.com'
    //         })
            
    //         expect(emp[0].id).toEqual('96896260');
    //     })

    //     it('should return employees matched by partial email', async () => {
    //         let emp = await envoy.employees({
    //             email: 'email'
    //         })
            
    //         expect(emp[0].id).toEqual('96896260');
    //     })

    //     it('should filter by page number and how many employees are shown per page', async () => {
    //         let emp = await envoy.employees({
    //             page: 1,
    //             perPage: 2,
    //         })
            
    //         expect(emp.length).toEqual(2);
    //     })

    //     it('should be able to sort results by NAME in ASC order', async () => {
    //         let emp = await envoy.employees({
    //             sort: 'NAME',
    //             order: 'ASC'
    //         })
            
    //         expect(emp[0].id).toEqual('94053615');
    //         expect(emp[emp.length - 1].id).toEqual('96849709');
    //     })

    //     it('should be able to sort results by NAME in DESC order', async () => {
    //         let emp = await envoy.employees({
    //             sort: 'NAME',
    //             order: 'DESC'
    //         })
            
    //         expect(emp[0].id).toEqual('96849709');
    //         expect(emp[emp.length - 1].id).toEqual('94053615');
    //     });

    //     it('should be able to sort results by EMAIL in ASC order', async () => {
    //         let emp = await envoy.employees({
    //             sort: 'EMAIL',
    //             order: 'ASC'
    //         })
            
    //         expect(emp[0].id).toEqual('96896260');
    //         expect(emp[emp.length - 1].id).toEqual('94053615');
    //     });

    //     it('should be able to sort results by EMAIL in DESC order', async () => {
    //         let emp = await envoy.employees({
    //             sort: 'EMAIL',
    //             order: 'DESC'
    //         });
            
    //         expect(emp[0].id).toEqual('94053615');
    //         expect(emp[emp.length - 1].id).toEqual('96896260');
    //     });

    //     it('should be able to combine all the above in one options params', async () => {
    //         let emp = await envoy.employees({
    //             name: 'Full',
    //             email: 'email',
    //             page: 1,
    //             perPage: 2,
    //             sort: 'EMAIL',
    //             order: 'ASC',
    //         })

    //         expect(emp[0].id).toEqual('96896260');
    //     });
    // });
    
    /* Don't run this test as it will overwrite all employees with your uploaded csv file. This is also a deprecated API.
    describe('(Deprecated) Employee Import', () => {
        it('Should import employees from a csv file.', async () => {
            let file = fs.createReadStream('./lib/test/resource/employees-export.csv');
            let empImport = await envoy.importEmployeeRecords(file);
            
            expect(empImport.message).toEqual('File uploaded successfully. Check /api/configuration/import_status for status.');
        })
    });
    */

    // describe('(Deprecated) locationEmployees', () => {
    //     it('should return employees from a location.', async () => {
    //         let employees = await envoy.locationEmployees(143497, {
    //             //Optional params.
    //             email: 'email@example.com'
    //         });
    //         expect(employees[0].type).toEqual('employees');
    //     })

    //     it('should return status 404 if location can\'t be found.', async () => {
    //         let errMsg = null;
            
    //         try {
    //             await envoy.locationEmployees(999999);
    //         } catch(err) {
    //             errMsg = err.statusCode;
    //         }

    //         expect(errMsg).toEqual(404);
    //     })
    // });

    // describe('(Deprecated) flowBadge', () => {
    //     it('should return badge for this flow.', async () => {
    //         let flow = await envoy.flowBadge(295831);

    //         expect(flow.id).toEqual('226107');
    //     })

    //     it('should return status 404 if flow can\'t be found.', async () => {
    //         let errMsg = null;
            
    //         try {
    //             await envoy.flowBadge(999999);
    //         } catch(err) {
    //             errMsg = err.statusCode;
    //         }

    //         expect(errMsg).toEqual(404);
    //     })
        
    // });

    // describe('(Deprecated) signInPage', () => {
    //     it('should return sign-in page details for this flow', async () => {
    //         let page = await envoy.signInPage(295831);
    //         expect(page.type).toEqual('sign-in-field-pages');
    //     })

    //     it('should return status 404 if flow can\'t be found.', async () => {
    //         let errMsg = null;
            
    //         try {
    //             await envoy.signInPage(999999);
    //         } catch(err) {
    //             errMsg = err.statusCode;
    //         }

    //         expect(errMsg).toEqual(404);
    //     })
        
    // });

    describe('(Deprecated) signInFields', () => {
        it('should return the sign-in fields for this page', async () => {
            let page = await envoy.signInFields(1433967);
            expect(page.type).toEqual('sign-in-field-pages');
        })

        it('should return status 404 if flow can\'t be found.', async () => {
            let errMsg = null;
            
            try {
                await envoy.signInFields(999999);
            } catch(err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })
        
    });
})  
