import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { createAxiosClient, sanitizeAxiosError } from '../../src/util/axiosConstructor';

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
          expect(error.stack).toBe(originalStack);
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
  });
});
