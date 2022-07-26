const EnvoyAPI = require('../EnvoyAPI');
const request = require('request');
const fs = require('fs');
let envoy = null;
let envoyNoScopes = null;

const TOKEN_SCOPE = [
    "token.refresh",
    "flows.read",
    "entries.read",
    "entries.write",
    "invites.read",
    "invites.write",
    "invites.attest",
    "locations.read",
    "companies.read",
    "audit-logs.read",
    "agreements.read",
    "agreements.write",
    "sign-in-field-pages.read",
    "sign-in-fields.read",
    "sign-in-fields.write",
    "employees.read",
    "employees.write",
    "badges.read",
    "blacklist-filters.read",
    "blacklist-filters.write",
    "devices.read",
    "tickets.read",
    "tickets.write",
    "spaces.read",
    "reservations.read",
    "reservations.write",
    "work-schedules.read",
    "work-schedules.write"
]

/** 
 * Manually login to an Admin account and get their token.
 * Get an access token generated from ENVOY_CLIENT_ID and ENVOY_CLIENT_SECRET provided from env file. 
 * Or use ENVOY_CLIENT_API_KEY which is currently in beta testing. 
 * Also see scopes here: https://developers.envoy.com/hub/docs/scopes#access-scopes for optional list of permissions for the token.
 */
async function getAccessToken() {
    const apiKey = process.env.ENVOY_CLIENT_API_KEY;
    const devUser = process.env.DEV_USER_NAME;
    const devPassword = process.env.DEV_PASSWORD;
    const AuthURL = process.env.ENVOY_BASE_URL || 'https://api.envoy.com/oauth2/token';

    var options = {
        'method': 'POST',
        'url': AuthURL,
        'headers': {
            'Authorization': 'Basic ' + apiKey,
            json: true
        },
        formData: {
            'username': devUser,
            'password': devPassword,
            'scope': TOKEN_SCOPE.join(),
            'grant_type': 'password',
        }
    };

    const body = await request(options, function (error, response) {
        if (error) throw new Error(error);
        response.body;
    });

    return JSON.parse(body);
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
        // console.log("USING ACCESS TOKEN: ", accessToken.access_token);
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

        it('flows() should return all visitor flows given a location Id', async () => {
            let flows = await envoy.flows(143497);
            expect(flows[0].id).toEqual('295831');
        });

        it('flows() should return an empty array if location can\'t be found', async () => {
            flows = await envoy.flows(999999);
            expect(flows).toEqual([]);
        });

        it('flow() should return a single flow given a flow Id', async () => {
            let flow = await envoy.flow(295831);
            expect(flow.id).toEqual('295831');
        });

        it('flow() should return status code 404 if flow id can\t be found', async () => {
            try {
                await envoy.flow(999909999);
            } catch (err) {
                flow = err;
            }

            expect(flow.statusCode).toEqual(404);
        });
    });

    describe('Company', () => {
        it('companies() should retrieve details for companies scoped to the access token.', async () => {
            let company = await envoy.companies();
            expect(company[0].id).toEqual('110090');
        })
    });

    describe('Employees', () => {
        it('should return an array of employees scoped to the access token\'s company when no args are provided', async () => {
            let employees = await envoy.employees();
            expect(employees[0].id).toEqual('94053615');
        })

        it('should return an employee if an employee ID is passed as an arg', async () => {
            let emp = await envoy.employees(96896260);
            expect(emp.id).toEqual('96896260');
        }) 

        it('should return an array of employees when multiple Ids are passed in via the optional params', async () => {
            let emp = await envoy.employees({
                ids: '96896260,97026819'
            });

            expect(emp[0].id).toEqual('96896260');
            expect(emp[1].id).toEqual('97026819');
        });

        it('should return employees matching names passed in via the options param', async () => {
            let emp = await envoy.employees({
                name: 'Full Name'
            })

            expect(emp[0].id).toEqual('96896260');
        });

        it('should return employees matched via partial names', async () => {
            let emp = await envoy.employees({
                name: 'Full'
            })

            expect(emp[0].id).toEqual('96896260');
        })

        it('should return employees by email', async () => {
            let emp = await envoy.employees({
                email: 'email@example.com'
            })

            expect(emp[0].id).toEqual('96896260');
        })

        it('should return employees matched by partial email', async () => {
            let emp = await envoy.employees({
                email: 'email'
            })

            expect(emp[0].id).toEqual('96896260');
        })

        it('should filter by page number and how many employees are shown per page', async () => {
            let emp = await envoy.employees({
                page: 1,
                perPage: 2,
            })

            expect(emp.length).toEqual(2);
        })

        it('should be able to sort results by NAME in ASC order', async () => {
            let emp = await envoy.employees({
                sort: 'NAME',
                order: 'ASC'
            })

            expect(emp[0].id).toEqual('94053615');
            expect(emp[emp.length - 1].id).toEqual('96849709');
        })

        it('should be able to sort results by NAME in DESC order', async () => {
            let emp = await envoy.employees({
                sort: 'NAME',
                order: 'DESC'
            })

            expect(emp[0].id).toEqual('96849709');
            expect(emp[emp.length - 1].id).toEqual('94053615');
        });

        it('should be able to sort results by EMAIL in ASC order', async () => {
            let emp = await envoy.employees({
                sort: 'EMAIL',
                order: 'ASC'
            })

            expect(emp[0].id).toEqual('96896260');
            expect(emp[emp.length - 1].id).toEqual('94053615');
        });

        it('should be able to sort results by EMAIL in DESC order', async () => {
            let emp = await envoy.employees({
                sort: 'EMAIL',
                order: 'DESC'
            });

            expect(emp[0].id).toEqual('94053615');
            expect(emp[emp.length - 1].id).toEqual('96896260');
        });

        it('should be able to combine all the above in one options params', async () => {
            let emp = await envoy.employees({
                name: 'Full',
                email: 'email',
                page: 1,
                perPage: 2,
                sort: 'EMAIL',
                order: 'ASC',
            })

            expect(emp[0].id).toEqual('96896260');
        });
    });

    /* Don't run this test as it will overwrite all employees with your uploaded csv file. This is also a deprecated API.
    describe('(Deprecated) Employee Import', () => {
        it('Should import employees from a csv file.', async () => {
            let file = fs.createReadStream('./lib/test/resource/employees-export.csv');
            let empImport = await envoy.importEmployeeRecords(file);

            expect(empImport.message).toEqual('File uploaded successfully. Check /api/configuration/import_status for status.');
        })
    });
    */

    describe('(Deprecated) locationEmployees', () => {
        it('should return employees from a location.', async () => {
            let employees = await envoy.locationEmployees(143497, {
                //Optional params.
                email: 'email@example.com'
            });
            expect(employees[0].type).toEqual('employees');
        })

        it('should return status 404 if location can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.locationEmployees(999999);
            } catch(err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })
    });

    describe('(Deprecated) flowBadge', () => {
        it('should return badge for this flow.', async () => {
            let flow = await envoy.flowBadge(295831);

            expect(flow.id).toEqual('226107');
        })

        it('should return status 404 if flow can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.flowBadge(999999);
            } catch(err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

    });

    describe('(Deprecated) signInPage', () => {
        it('should return sign-in page details for this flow', async () => {
            let page = await envoy.signInPage(295831);
            expect(page.type).toEqual('sign-in-field-pages');
        })

        it('should return status 404 if flow can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.signInPage(999999);
            } catch(err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

    });

    describe('getSignInFields', () => {
        it('should return the sign-in fields for this flow', async () => {
            let page = await envoy.getSignInFields(295831);
            expect(page[0].type).toEqual('sign-in-fields');
        })

        it('should return status 404 if flow can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.getSignInFields(999999);
            } catch (err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

    });

    // Updated Entries Unit Test will be added pending release of new Entries API.
    describe('Legacy Entries ', () => {
        const ENTRY_TEST = {
            "data": {
                "attributes": {
                    "locality": { "place-id": "143497" },
                    "user-data": {
                        "Purpose of visit": "Visiting",
                        "Your Email Address": "email@example.com",
                        "Host": "Full Name",
                        "Your Full Name": "Kenny La"
                    },
                    "full-name": "Example Name",
                    "email": "email@example.com",
                    "private-notes": "This private note is optional and not visible to your visitor",
                    "print-badge": false,
                    "send-host-notification": false,
                    "current-location-id": 143497,
                    "flow-name": "Visitor",
                    "finalized-at": "2022-06-06T15:52:00Z"
                },
                "relationships": {
                    "location": {
                        "data": {
                            "type": "locations",
                            "id": 143497
                        }
                    },
                    "sign-in-user": {
                        "data": {
                            "type": "locations",
                            "id": 143497
                        }
                    }
                },
                "type": "locations"
            }
        }

        it('getEntriesByDate should return entries by dates', async () => {
            let entries = await envoy.getEntriesByDate({
                location: 143497,
                limit: 25,
                offset: 0,
                start_date: '2019-01-02',
                end_date: '2022-06-01'
            });
    
            expect(entries[0].type).toEqual('entries');
        })

        it('should return status 404 if location can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.getEntriesByDate({
                    location: 99999,
                    limit: 25,
                    offset: 0,
                    start_date: '2019-01-02',
                    end_date: '2022-06-01'
                });
            } catch (err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

        it('entry should return entry by entry ID', async () => {
            let entry = await envoy.entry(108010371);
            expect(entry.id).toEqual('108010371');
        })

        it('should return status 404 if entry can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.entry(99999);
            } catch (err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

        it('patchEntry should update an entry found via entry ID', async () => {
            let entry = await envoy.patchEntry(108010371, ENTRY_TEST);
            expect(entry.id).toEqual('108010371');
        })

        it('should return status 404 if entry can\'t be found.', async () => {
            let errMsg = null;

            try {
                await envoy.entry(99999);
            } catch (err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

        it('createEntry should create an entry', async () => {
            let entry = await envoy.createEntry(ENTRY_TEST);
            expect(entry.statusCode).toEqual(204);
        })

        it('createEntry should return status 400 on improper entry object.', async () => {
            let errMsg = null;

            try {
                await envoy.createEntry({ fail: 'Fail' });
            } catch (err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(400);
        })
    });

    describe('Work Schedule', () => {
        it('workSchedule should get a work schedule', async () => {
            let work = await envoy.workSchedule(36766737);
            expect(work.id).toEqual('36766737');
            expect(work.locationId).toEqual('143497');
        })

        it('workSchedule should return status 404 when not found', async () => {
            let errMsg = null;

            try {
                await envoy.workSchedule('None');
            } catch (err) {
                errMsg = err.statusCode;
            }

            expect(errMsg).toEqual(404);
        })

        it('workSchedules should return all workSchedules scoped to the current user\s token', async () => {
            let work = await envoy.workSchedules();
            expect(work[0].locationId).toEqual('143497');
        })

        it('workSchedules should return all workSchedules filtered by params', async () => {
            let work = await envoy.workSchedules({
                createdAtAfter: "2021-06-06T15:52:00Z",
                createdAtBefore: "2121-06-06T15:52:00Z",
                expectedArrivalAtAfter: "2000-06-06T15:52:00Z",
                expectedArrivalAtBefore: "2121-06-06T15:52:00Z",
                locationIds: ['143497'],
                page: 1,
                perPage: 10,
            });

            expect(work[0].locationId).toEqual('143497');
            expect(work[0]).toHaveProperty('expectedArrivalAt', expect.any(String));
        })

        it('workSchedules should return empty array if no schedules can be found with given params', async () => {
            let work = await envoy.workSchedules({
                createdAtAfter: "2121-06-06T15:52:00Z",
                createdAtBefore: "2221-06-06T15:52:00Z",
                expectedArrivalAtAfter: "2000-06-06T15:52:00Z",
                expectedArrivalAtBefore: "2121-06-06T15:52:00Z",
                locationIds: ['143497'],
                page: 1,
                perPage: 10,
            });

            expect(work).toEqual([]);
        })

        let createdWorkScheduleId = '';
        it('createWorkSchedule should create a work schedule', async () => {
            let work = await envoy.createWorkSchedule({
                locationId: 143497,
                email: 'email@example.com',
                expectedArrivalAt: '1900-06-06T15:52:00Z'
            })
            createdWorkScheduleId = work.id;
            expect(work.scheduledFor.email).toEqual('email@example.com');
        })
        
        it('createWorkSchedule should return 404 if no employee with email exists', async () => {
            let work = null;
            try {
                await envoy.createWorkSchedule({
                    locationId: 143497,
                    email: 'Nobody',
                    expectedArrivalAt: '1900-06-06T15:52:00Z'
                })
            } catch (err) {
                work = err.statusCode;
            }

            expect(work).toEqual(404);
        })

        it('createWorkSchedule should return 404 if location id can\t be found', async () => {
            let work = null;
            try {
                await envoy.createWorkSchedule({
                    locationId: 'None',
                    email: 'Nobody',
                    expectedArrivalAt: '1900-06-06T15:52:00Z'
                })
            } catch (err) {
                work = err.statusCode;
            }

            expect(work).toEqual(404);
        })

        it('createWorkSchedule should return 400 if no params are provided', async () => {
            let work = null;
            try {
                await envoy.createWorkSchedule({})
            } catch (err) {
                work = err.statusCode;
            }

            expect(work).toEqual(400);
        })

        it('createWorkSchedule should return 400 if email is not a string', async () => {
            let work = null;
            try {
                await envoy.createWorkSchedule({
                    locationId: 143497,
                    email: 123456,
                    expectedArrivalAt: '1900-06-06T15:52:00Z'
                })
            } catch (err) {
                work = err.statusCode;
            }

            expect(work).toEqual(400);
        })

        it('createWorkSchedule should return 400 if date is not in date-time format', async () => {
            let work = null;
            try {
                await envoy.createWorkSchedule({
                    locationId: 143497,
                    email: 'email@example.com',
                    expectedArrivalAt: 'No'
                })
            } catch (err) {
                work = err.statusCode;
            }

            expect(work).toEqual(400);
        })

        it('deleteWorkSchedule should return the deleted work schedule', async () => {
            let work = await envoy.deleteWorkSchedule(createdWorkScheduleId);
            expect(work.id).toEqual(createdWorkScheduleId);
        })

        it('deleted work schedule should no longer exist', async () => {
            let work = null;
            try {
                work = await envoy.workSchedule(createdWorkScheduleId);
            } catch(err) {
                work = err.statusCode;
            }

            expect(work).toEqual(404);
        })


    })
})  