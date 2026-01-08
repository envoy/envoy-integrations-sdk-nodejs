import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { createAxiosClient, sanitizeAxiosError } from '../../src/util/axiosConstructor';
import * as diplomat from '../../src/util/diplomat';

describe('Axios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sanitizeAxiosError', () => {
    it('returns non-error as error', () => {
      const result = sanitizeAxiosError('Test error');

      expect(result).toBeInstanceOf(Error);
    });

    it('returns non-axios errors as-is', () => {
      const error = new Error('Test error');

      const result = sanitizeAxiosError(error);

      expect(result).toBe(error);
    });

    it('sanitizes sensitive data from axios error', () => {
      const secrets = {
        token: 'Bearer secret-token',
        apiKey: 'secret-api-key',
        cookie: 'session=secret-session',
        password: 'secret123',
      };
      const originalError = new AxiosError(
        'Test error',
        'TEST_CODE',
        {
          url: 'http://example.com',
          method: 'POST',
          headers: new AxiosHeaders({
            Authorization: secrets.token,
            'x-api-key': secrets.apiKey,
            'safe-header': 'safe-value',
          }),
          data: {
            password: secrets.password,
            token: secrets.token,
            safeData: 'public-info',
          },
        },
        undefined,
        {
          status: 400,
          statusText: 'Bad Request',
          data: { error: 'Invalid request' },
          headers: new AxiosHeaders({
            'set-cookie': secrets.cookie,
          }),
          config: {
            headers: new AxiosHeaders({
              Authorization: secrets.token,
            }),
          },
        },
      );

      const result = sanitizeAxiosError(originalError) as AxiosError;

      expect(result).toBeInstanceOf(AxiosError);
      expect(result.message).toBe('Test error');
      expect(result.code).toBe('TEST_CODE');

      // Verify config is sanitized
      expect(result.config?.headers).toEqual(new AxiosHeaders());
      expect(result.config?.data).toBeUndefined();

      // Verify response is sanitized
      expect(result.response?.headers).toEqual(new AxiosHeaders());
      expect(result.response?.config.headers).toEqual(new AxiosHeaders());

      // Verify sensitive data is not in stringified version
      const errorStr = JSON.stringify(result);
      expect(errorStr).not.toContain(secrets.token);
      expect(errorStr).not.toContain(secrets.apiKey);
      expect(errorStr).not.toContain(secrets.password);
      expect(errorStr).not.toContain(secrets.cookie);
    });

    it('handles errors with missing properties', () => {
      const originalError = new AxiosError('Test error', 'TEST_CODE');
      originalError.config = undefined;
      originalError.response = undefined;
      originalError.request = undefined;

      const result = sanitizeAxiosError(originalError) as AxiosError;

      expect(result).toMatchObject({
        name: AxiosError.name,
        message: 'Test error',
        code: 'TEST_CODE',
        config: expect.any(Object),
        response: expect.any(Object),
        request: expect.any(Object),
      });
    });

    it('preserves stack trace', () => {
      const originalError = new AxiosError('Test error', 'TEST_CODE');
      const originalStack = 'Error: Test error\n    at Test.it';
      originalError.stack = originalStack;

      const result = sanitizeAxiosError(originalError) as AxiosError;

      expect(result.stack).toBe(originalStack);
    });
  });

  it('default client leaks credentials in AxiosError', async () => {
    const client = axios.create({
      headers: {
        Authorization: 'Bearer 1234',
      },
      proxy: {
        host: 'example.com',
        port: 80,
        auth: {
          username: 'myWhackyUsername',
          password: 'myWhackyPassword',
        },
      },
    });
    try {
      await client.get('http://example.com');
    } catch (error) {
      expect(error.config).toBeDefined();
      const errorStr = JSON.stringify(error);
      expect(errorStr).toContain('Bearer 1234');
      expect(errorStr).toContain('myWhackyUsername');
      expect(errorStr).toContain('myWhackyPassword');
    }
  });

  describe('createAxiosClient', () => {
    describe('Client Creation and Configuration', () => {
      it('creates client with default config when no config provided', () => {
        const client = createAxiosClient();

        expect(client.defaults.headers).toBeDefined();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(client.request).toBeInstanceOf(Function);
      });

      it('merges custom headers with default headers', async () => {
        const client = createAxiosClient({
          headers: {
            'x-custom-header': 'custom-value',
            authorization: 'Bearer token',
          },
        });

        const mockAdapter = jest.fn().mockImplementation((config) => {
          expect(config.headers).toEqual(
            expect.objectContaining({
              Accept: expect.any(String),
              'x-custom-header': 'custom-value',
              authorization: 'Bearer token',
            }),
          );
          return Promise.resolve({} as AxiosResponse);
        });
        client.defaults.adapter = mockAdapter;

        await client.get('http://example.com');
      });
    });

    describe('Error Handling', () => {
      it('does not convert non-axios errors to AxiosError', async () => {
        const client = createAxiosClient();
        const customError = new Error('Custom error');

        const mockAdapter = jest.fn().mockRejectedValue(customError);
        client.defaults.adapter = mockAdapter;

        try {
          await client.get('http://example.com');
          fail('Should have thrown an error');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('Custom error');
          expect(error).not.toBeInstanceOf(AxiosError);
        }
      });

      it('preserves error stack traces after sanitization', async () => {
        const client = createAxiosClient();
        const originalError = new AxiosError('Test error', 'TEST_CODE');
        const originalStack = 'Error: Test error\n    at Test.it';
        originalError.stack = originalStack;

        const mockAdapter = jest.fn().mockRejectedValue(originalError);
        client.defaults.adapter = mockAdapter;

        try {
          await client.get('http://example.com');
          fail('Should have thrown an error');
        } catch (error) {
          expect(error.stack).toContain(originalStack);
        }
      });
    });

    describe('Data Sanitization', () => {
      it('sanitizes sensitive data from request headers', async () => {
        const client = createAxiosClient();
        const originalError = new AxiosError('Test error', 'TEST_CODE', {
          headers: new AxiosHeaders({
            Authorization: 'Bearer secret-token',
            'x-api-key': 'secret-api-key',
            'safe-header': 'safe-value',
          }),
        });

        const mockAdapter = jest.fn().mockRejectedValue(originalError);
        client.defaults.adapter = mockAdapter;

        try {
          await client.get('http://example.com');
          fail('Should have thrown an error');
        } catch (error) {
          expect(error.config.headers).toBeInstanceOf(AxiosHeaders);
          expect(error.config.headers.get('Authorization')).toBeUndefined();
          expect(error.config.headers.get('x-api-key')).toBeUndefined();
          expect(error.config.headers.get('safe-header')).toBeUndefined();
          expect(JSON.stringify(error)).not.toContain('secret-token');
        }
      });

      it('sanitizes sensitive data from request body', async () => {
        const client = createAxiosClient();
        const sensitiveData = {
          password: 'secret123',
          token: 'sensitive-token',
          safeData: 'public-info',
        };

        const originalError = new AxiosError('Test error', 'TEST_CODE', {
          data: sensitiveData,
          headers: new AxiosHeaders(),
        });

        const mockAdapter = jest.fn().mockRejectedValue(originalError);
        client.defaults.adapter = mockAdapter;

        try {
          await client.post('http://example.com', sensitiveData);
          fail('Should have thrown an error');
        } catch (error) {
          expect(error.config.data).toBeUndefined();
          const errorStr = JSON.stringify(error);
          expect(errorStr).not.toContain('secret123');
          expect(errorStr).not.toContain('sensitive-token');
        }
      });
    });

    describe('Response Handling', () => {
      it('preserves response status and status text', async () => {
        const client = createAxiosClient();
        const originalError = new AxiosError('Test error', 'TEST_CODE', { headers: new AxiosHeaders() }, undefined, {
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Resource not found' },
          headers: new AxiosHeaders(),
          config: { headers: new AxiosHeaders() },
        });

        const mockAdapter = jest.fn().mockRejectedValue(originalError);
        client.defaults.adapter = mockAdapter;

        try {
          await client.get('http://example.com');
          fail('Should have thrown an error');
        } catch (error) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.statusText).toBe('Not Found');
          expect(error.response?.data).toEqual({ message: 'Resource not found' });
        }
      });

      it('handles errors with missing response data', async () => {
        const client = createAxiosClient();
        const originalError = new AxiosError('Test error', 'TEST_CODE', { headers: new AxiosHeaders() }, undefined, {
          data: undefined,
          status: 500,
          statusText: 'Internal Server Error',
          headers: new AxiosHeaders(),
          config: { headers: new AxiosHeaders() },
        });

        const mockAdapter = jest.fn().mockRejectedValue(originalError);
        client.defaults.adapter = mockAdapter;

        try {
          await client.get('http://example.com');
          fail('Should have thrown an error');
        } catch (error) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.statusText).toBe('Internal Server Error');
          expect(error.response?.data).toBeUndefined();
        }
      });
    });

    describe('Diplomat Routing', () => {
      let getDiplomatClientInstallSpy: jest.SpyInstance;

      beforeEach(() => {
        // Mock environment variables for diplomat server
        process.env.DIPLOMAT_SERVER_URL = 'https://diplomat.example.com';
        process.env.DIPLOMAT_SERVER_AUTH_USERNAME = 'test-user';
        process.env.DIPLOMAT_SERVER_AUTH_PASSWORD = 'test-pass';

        // Mock getDiplomatClientInstall
        getDiplomatClientInstallSpy = jest.spyOn(diplomat, 'getDiplomatClientInstall');
      });

      afterEach(() => {
        delete process.env.DIPLOMAT_SERVER_URL;
        delete process.env.DIPLOMAT_SERVER_V1_URL;
        delete process.env.DIPLOMAT_SERVER_AUTH_USERNAME;
        delete process.env.DIPLOMAT_SERVER_AUTH_PASSWORD;
        getDiplomatClientInstallSpy.mockRestore();
      });

      describe('Request Interceptor', () => {
        it('bypasses diplomat when no x-envoy-install-id header', async () => {
          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: { success: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
          });
          client.defaults.adapter = mockAdapter;

          await client.get('https://api.example.com/endpoint');

          expect(getDiplomatClientInstallSpy).not.toHaveBeenCalled();
          expect(mockAdapter).toHaveBeenCalledWith(
            expect.objectContaining({
              url: 'https://api.example.com/endpoint',
              method: 'get',
            }),
          );
        });

        it('bypasses diplomat when diplomat config is not found', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue(null);

          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: { success: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
          });
          client.defaults.adapter = mockAdapter;

          await client.get('https://api.example.com/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
            },
          });

          expect(getDiplomatClientInstallSpy).toHaveBeenCalledWith('test-install-123');
          expect(mockAdapter).toHaveBeenCalledWith(
            expect.objectContaining({
              url: 'https://api.example.com/endpoint',
              method: 'get',
            }),
          );
        });

        it('bypasses diplomat when diplomat is disabled', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: false,
            internal_url: 'http://internal.example.com',
          });

          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: { success: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
          });
          client.defaults.adapter = mockAdapter;

          await client.get('https://api.example.com/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
            },
          });

          expect(getDiplomatClientInstallSpy).toHaveBeenCalledWith('test-install-123');
          expect(mockAdapter).toHaveBeenCalledWith(
            expect.objectContaining({
              url: 'https://api.example.com/endpoint',
              method: 'get',
            }),
          );
        });

        it('bypasses diplomat when server config is missing', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          delete process.env.DIPLOMAT_SERVER_URL;

          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: { success: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
          });
          client.defaults.adapter = mockAdapter;

          await client.get('https://api.example.com/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
            },
          });

          expect(mockAdapter).toHaveBeenCalledWith(
            expect.objectContaining({
              url: 'https://api.example.com/endpoint',
              method: 'get',
            }),
          );
        });

        it('routes through diplomat when enabled', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(false);

          const client = createAxiosClient({ baseURL: 'https://api.example.com' });
          const mockAdapter = jest.fn().mockResolvedValue({
            data: {
              status: 200,
              headers: { 'content-type': 'application/json' },
              body: Buffer.from(JSON.stringify({ result: 'success' })).toString('base64'),
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
              headers: new AxiosHeaders({
                'x-diplomat-routed': 'true',
                'x-diplomat-version': 'latest',
              }),
            },
          });
          client.defaults.adapter = mockAdapter;

          await client.post(
            '/endpoint',
            { key: 'value' },
            {
              headers: {
                'x-envoy-install-id': 'test-install-123',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );

          const callArgs = mockAdapter.mock.calls[0][0];
          expect(callArgs.baseURL).toBe('https://diplomat.example.com');
          expect(callArgs.url).toBe('/clients/client-123/tasks');
          expect(callArgs.method).toBe('POST');
          expect(callArgs.auth).toEqual({
            username: 'test-user',
            password: 'test-pass',
          });

          // data gets JSON.stringified by axios, so parse it back
          const parsedData = JSON.parse(callArgs.data);
          expect(parsedData).toEqual(expect.objectContaining({
            handler: 'http',
            options: expect.objectContaining({
              method: 'POST',
              baseURL: 'http://internal.example.com/',
              url: '/endpoint',
              headers: expect.objectContaining({
                'Content-Type': 'application/x-www-form-urlencoded',
              }),
            }),
          }));
          expect(parsedData.options.body).toBeTruthy();

          expect(callArgs.headers['x-diplomat-routed']).toBe('true');
          expect(callArgs.headers['x-diplomat-version']).toBe('latest');
          expect(callArgs.headers['Content-Type']).toBe('application/json');
        });

        it('removes x-envoy-install-id from forwarded headers', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(false);

          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: {
              status: 200,
              headers: {},
              body: Buffer.from('{}').toString('base64'),
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
              headers: new AxiosHeaders({
                'x-diplomat-routed': 'true',
              }),
            },
          });
          client.defaults.adapter = mockAdapter;

          await client.get('http://api.example.com/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
              'x-custom-header': 'custom-value',
            },
          });

          const callArgs = mockAdapter.mock.calls[0][0];
          const parsedData = JSON.parse(callArgs.data);
          expect(parsedData.options.headers).not.toHaveProperty('x-envoy-install-id');
          expect(parsedData.options.headers).toHaveProperty('x-custom-header', 'custom-value');
        });

        it('adds trailing slash to internal_url', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(false);

          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: {
              status: 200,
              headers: {},
              body: Buffer.from('{}').toString('base64'),
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
              headers: new AxiosHeaders({
                'x-diplomat-routed': 'true',
              }),
            },
          });
          client.defaults.adapter = mockAdapter;

          await client.get('/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
            },
          });

          const callArgs = mockAdapter.mock.calls[0][0];
          const parsedData = JSON.parse(callArgs.data);
          expect(parsedData.options.baseURL).toBe('http://internal.example.com/');
        });

        it('overrides Content-Type to application/json for diplomat request', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(false);

          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: {
              status: 200,
              headers: {},
              body: Buffer.from('{}').toString('base64'),
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
              headers: new AxiosHeaders({
                'x-diplomat-routed': 'true',
                'Content-Type': 'application/json',
              }),
            },
          });
          client.defaults.adapter = mockAdapter;

          await client.post(
            '/endpoint',
            'key=value',
            {
              headers: {
                'x-envoy-install-id': 'test-install-123',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );

          const callArgs = mockAdapter.mock.calls[0][0];
          const parsedData = JSON.parse(callArgs.data);

          // Diplomat request should have JSON Content-Type
          expect(callArgs.headers['Content-Type']).toBe('application/json');
          // But original Content-Type preserved in options.headers for target system
          expect(parsedData.options.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
        });
      });

      describe('Response Interceptor', () => {
        it('decodes diplomat latest format response', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(false);

          const client = createAxiosClient();
          const targetResponseData = { result: 'success', cardNumber: '24188' };
          const mockAdapter = jest.fn().mockResolvedValue({
            data: {
              status: 200,
              headers: { 'content-type': 'application/json' },
              body: Buffer.from(JSON.stringify(targetResponseData)).toString('base64'),
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
              headers: new AxiosHeaders({
                'x-diplomat-routed': 'true',
                'x-diplomat-version': 'latest',
              }),
            },
          });
          client.defaults.adapter = mockAdapter;

          const response = await client.get('/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
            },
          });

          expect(response.status).toBe(200);
          expect(response.data).toEqual(targetResponseData);
          expect(response.headers).toEqual({ 'content-type': 'application/json' });
        });

        it('decodes diplomat v1 format response', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(true);
          process.env.DIPLOMAT_SERVER_V1_URL = 'https://diplomat-v1.example.com';

          const client = createAxiosClient();
          const targetResponseData = { result: 'success' };
          const mockAdapter = jest.fn().mockResolvedValue({
            data: {
              result: {
                body: Buffer.from(JSON.stringify(targetResponseData)).toString('base64'),
              },
            },
            status: 200,
            statusText: 'OK',
            headers: { 'x-diplomat-server': 'v1' },
            config: {
              headers: new AxiosHeaders({
                'x-diplomat-routed': 'true',
                'x-diplomat-version': 'v1',
              }),
            },
          });
          client.defaults.adapter = mockAdapter;

          const response = await client.get('/endpoint', {
            headers: {
              'x-envoy-install-id': 'test-install-123',
            },
          });

          expect(response.status).toBe(200);
          expect(response.data).toEqual(targetResponseData);
        });

        it('passes through non-diplomat responses unchanged', async () => {
          const client = createAxiosClient();
          const mockAdapter = jest.fn().mockResolvedValue({
            data: { success: true },
            status: 200,
            statusText: 'OK',
            headers: { 'content-type': 'application/json' },
            config: {
              headers: new AxiosHeaders(),
            },
          });
          client.defaults.adapter = mockAdapter;

          const response = await client.get('https://api.example.com/endpoint');

          expect(response.data).toEqual({ success: true });
          expect(response.status).toBe(200);
        });
      });

      describe('Error Interceptor', () => {
        it('decodes diplomat error response (latest format)', async () => {
          getDiplomatClientInstallSpy.mockResolvedValue({
            client_id: 'client-123',
            enabled: true,
            internal_url: 'http://internal.example.com',
          });

          jest.spyOn(diplomat, 'useDiplomatV1Routing').mockReturnValue(false);

          const client = createAxiosClient();
          const errorData = { error: 'Unauthorized', message: 'Invalid credentials' };

          // Mock adapter rejects with an AxiosError that has the diplomat response
          const mockAdapter = jest.fn().mockImplementation((config) => {
            const axiosError = new AxiosError('Request failed with status code 200', 'ERR_BAD_REQUEST');
            axiosError.config = config;
            axiosError.response = {
              data: {
                status: 401,
                headers: { 'content-type': 'application/json' },
                body: Buffer.from(JSON.stringify(errorData)).toString('base64'),
              },
              status: 200,
              statusText: 'OK',
              headers: {},
              config: {
                ...config,
                headers: new AxiosHeaders({
                  'x-diplomat-routed': 'true',
                  'x-diplomat-version': 'latest',
                }),
              },
            };
            return Promise.reject(axiosError);
          });
          client.defaults.adapter = mockAdapter;

          try {
            await client.get('/endpoint', {
              headers: {
                'x-envoy-install-id': 'test-install-123',
              },
            });
            fail('Should have thrown an error');
          } catch (error: any) {
            expect(error.response?.status).toBe(401);
            expect(error.response?.data).toEqual(errorData);
            expect(error.response?.headers).toEqual({ 'content-type': 'application/json' });
          }
        });

        it('passes through non-diplomat errors unchanged', async () => {
          const client = createAxiosClient();
          const axiosError = new AxiosError('Network Error', 'ERR_NETWORK');
          axiosError.response = {
            data: { error: 'Network error' },
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {
              headers: new AxiosHeaders(),
            },
          };

          const mockAdapter = jest.fn().mockRejectedValue(axiosError);
          client.defaults.adapter = mockAdapter;

          try {
            await client.get('https://api.example.com/endpoint');
            fail('Should have thrown an error');
          } catch (error) {
            expect(error.response?.status).toBe(500);
            expect(error.response?.data).toEqual({ error: 'Network error' });
          }
        });
      });
    });
  });
});
