import os from 'os';
import EnvoyAPI from '../../src/base/EnvoyAPI';
import { buildUserAgent, buildClientInfoHeader } from '../../src/util/userAgent';

// Mock the package.json version
jest.mock('../../package.json', () => ({
  version: '2.4.4',
}));

describe('EnvoyAPI', () => {
  const originalProcessVersion = process.version;
  const originalPlatform = os.platform;
  const originalConsoleError = console.error;
  const testAccessToken = 'test-access-token-12345';

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn();
    // Set consistent test values
    Object.defineProperty(process, 'version', {
      value: 'v18.0.0',
      writable: true,
    });
    os.platform = jest.fn().mockReturnValue('darwin');
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(process, 'version', {
      value: originalProcessVersion,
      writable: true,
    });
    os.platform = originalPlatform;
    console.error = originalConsoleError;
  });

  describe('constructor', () => {
    describe('backward compatibility with string parameter', () => {
      it('accepts string access token (legacy usage)', () => {
        const api = new EnvoyAPI(testAccessToken);

        expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
      });

      it('sets default User-Agent when using string parameter', () => {
        const api = new EnvoyAPI(testAccessToken);

        const expectedUserAgent = buildUserAgent();
        expect(api.axios.defaults.headers['User-Agent']).toBe(expectedUserAgent);
        expect(api.axios.defaults.headers['User-Agent']).toBe('envoy-integrations-sdk/2.4.4 node/18.0.0');
      });

      it('sets default X-Envoy-Client-Info when using string parameter', () => {
        const api = new EnvoyAPI(testAccessToken);

        const expectedClientInfo = buildClientInfoHeader();
        expect(api.axios.defaults.headers['X-Envoy-Client-Info']).toBe(expectedClientInfo);

        const clientInfoHeader = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;
        const parsedClientInfo = JSON.parse(clientInfoHeader);
        expect(parsedClientInfo).toEqual({
          sdk: 'envoy-integrations-sdk',
          version: '2.4.4',
          runtime: 'node',
          runtimeVersion: '18.0.0',
          platform: 'darwin',
        });
      });
    });

    describe('options object parameter', () => {
      it('accepts EnvoyAPIOptions object with accessToken only', () => {
        const api = new EnvoyAPI({ accessToken: testAccessToken });

        expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
      });

      it('sets default headers when userAgent is not provided', () => {
        const api = new EnvoyAPI({ accessToken: testAccessToken });

        const expectedUserAgent = buildUserAgent();
        const expectedClientInfo = buildClientInfoHeader();

        expect(api.axios.defaults.headers['User-Agent']).toBe(expectedUserAgent);
        expect(api.axios.defaults.headers['X-Envoy-Client-Info']).toBe(expectedClientInfo);
      });

      it('includes custom userAgent in User-Agent header', () => {
        const customUserAgent = 'MyApp/1.0.0';
        const api = new EnvoyAPI({
          accessToken: testAccessToken,
          userAgent: customUserAgent,
        });

        const expectedUserAgent = buildUserAgent(customUserAgent);
        expect(api.axios.defaults.headers['User-Agent']).toBe(expectedUserAgent);
        expect(api.axios.defaults.headers['User-Agent']).toBe(
          'envoy-integrations-sdk/2.4.4 node/18.0.0 MyApp/1.0.0',
        );
      });

      it('includes custom userAgent in X-Envoy-Client-Info header', () => {
        const customUserAgent = 'MyApp/1.0.0';
        const api = new EnvoyAPI({
          accessToken: testAccessToken,
          userAgent: customUserAgent,
        });

        const expectedClientInfo = buildClientInfoHeader(customUserAgent);
        expect(api.axios.defaults.headers['X-Envoy-Client-Info']).toBe(expectedClientInfo);

        const clientInfoHeader = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;
        const parsedClientInfo = JSON.parse(clientInfoHeader);
        expect(parsedClientInfo).toEqual({
          sdk: 'envoy-integrations-sdk',
          version: '2.4.4',
          runtime: 'node',
          runtimeVersion: '18.0.0',
          platform: 'darwin',
          application: 'MyApp/1.0.0',
        });
      });

      it('handles empty string userAgent', () => {
        const api = new EnvoyAPI({
          accessToken: testAccessToken,
          userAgent: '',
        });

        // Empty string is falsy, so it's treated as no custom user agent
        expect(api.axios.defaults.headers['User-Agent']).toBe('envoy-integrations-sdk/2.4.4 node/18.0.0');
      });

      it('handles userAgent with special characters', () => {
        const customUserAgent = 'My-Company_App/2.0.0-beta';
        const api = new EnvoyAPI({
          accessToken: testAccessToken,
          userAgent: customUserAgent,
        });

        expect(api.axios.defaults.headers['User-Agent']).toContain(customUserAgent);

        const clientInfoHeader = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;
        const parsedClientInfo = JSON.parse(clientInfoHeader);
        expect(parsedClientInfo.application).toBe(customUserAgent);
      });
    });

    describe('authorization header', () => {
      it('sets Bearer token correctly with string parameter', () => {
        const api = new EnvoyAPI(testAccessToken);

        expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
      });

      it('sets Bearer token correctly with options parameter', () => {
        const api = new EnvoyAPI({ accessToken: testAccessToken });

        expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
      });

      it('handles different token formats', () => {
        const tokenWithSpecialChars = 'abc123-DEF456_xyz.789';
        const api = new EnvoyAPI({ accessToken: tokenWithSpecialChars });

        expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${tokenWithSpecialChars}`);
      });
    });

    describe('axios client configuration', () => {
      it('has correct baseURL configured', () => {
        const api = new EnvoyAPI(testAccessToken);

        expect(api.axios.defaults.baseURL).toBeDefined();
      });

      it('has correct Content-Type header', () => {
        const api = new EnvoyAPI(testAccessToken);

        expect(api.axios.defaults.headers['Content-Type']).toBe('application/vnd.api+json');
      });

      it('has correct Accept header', () => {
        const api = new EnvoyAPI(testAccessToken);

        expect(api.axios.defaults.headers.Accept).toBe('application/vnd.api+json');
      });

      it('has dataLoader configured', () => {
        const api = new EnvoyAPI(testAccessToken);

        // Access the protected dataLoader to verify it exists
        expect((api as any).dataLoader).toBeDefined();
      });

      it('has response interceptor configured', () => {
        const api = new EnvoyAPI(testAccessToken);

        expect(api.axios.interceptors.response).toBeDefined();
        // Interceptor should be registered (checking internal handlers is implementation detail)
        expect((api.axios.interceptors.response as any).handlers).toBeDefined();
      });
    });
  });

  describe('header format validation', () => {
    it('User-Agent follows standard format', () => {
      const api = new EnvoyAPI(testAccessToken);
      const userAgent = api.axios.defaults.headers['User-Agent'];

      // Format: sdk/version runtime/version
      expect(userAgent).toMatch(/^envoy-integrations-sdk\/[\d.]+ node\/[\d.]+$/);
    });

    it('User-Agent with custom app follows extended format', () => {
      const api = new EnvoyAPI({
        accessToken: testAccessToken,
        userAgent: 'MyApp/1.0.0',
      });
      const userAgent = api.axios.defaults.headers['User-Agent'];

      // Format: sdk/version runtime/version custom
      expect(userAgent).toMatch(/^envoy-integrations-sdk\/[\d.]+ node\/[\d.]+ .+$/);
    });

    it('X-Envoy-Client-Info is valid JSON', () => {
      const api = new EnvoyAPI(testAccessToken);
      const clientInfo = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;

      expect(() => JSON.parse(clientInfo)).not.toThrow();
    });

    it('X-Envoy-Client-Info contains required fields', () => {
      const api = new EnvoyAPI(testAccessToken);
      const clientInfoHeader = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;
      const clientInfo = JSON.parse(clientInfoHeader);

      expect(clientInfo).toHaveProperty('sdk');
      expect(clientInfo).toHaveProperty('version');
      expect(clientInfo).toHaveProperty('runtime');
      expect(clientInfo).toHaveProperty('runtimeVersion');
      expect(clientInfo).toHaveProperty('platform');
    });

    it('X-Envoy-Client-Info contains application field when userAgent provided', () => {
      const api = new EnvoyAPI({
        accessToken: testAccessToken,
        userAgent: 'MyApp/1.0.0',
      });
      const clientInfoHeader = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;
      const clientInfo = JSON.parse(clientInfoHeader);

      expect(clientInfo).toHaveProperty('application', 'MyApp/1.0.0');
    });

    it('X-Envoy-Client-Info does not contain application field when userAgent not provided', () => {
      const api = new EnvoyAPI(testAccessToken);
      const clientInfoHeader = api.axios.defaults.headers['X-Envoy-Client-Info'] as string;
      const clientInfo = JSON.parse(clientInfoHeader);

      expect(clientInfo).not.toHaveProperty('application');
    });
  });

  describe('error handling and resilience', () => {
    it('SDK initialization succeeds even with os.platform errors', () => {
      // Simulate error in platform detection
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('platform error');
      });

      // SDK should still initialize successfully
      const api = new EnvoyAPI(testAccessToken);

      expect(api).toBeDefined();
      expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
      // User-Agent should have fallback value
      expect(api.axios.defaults.headers['User-Agent']).toBeDefined();
    });

    it('sets fallback User-Agent headers when generation encounters errors', () => {
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('platform error');
      });

      const api = new EnvoyAPI(testAccessToken);

      // Should have some User-Agent header (with fallback values)
      expect(api.axios.defaults.headers['User-Agent']).toBeDefined();
      expect(typeof api.axios.defaults.headers['User-Agent']).toBe('string');

      // Should have some X-Envoy-Client-Info header
      expect(api.axios.defaults.headers['X-Envoy-Client-Info']).toBeDefined();

      // Verify the JSON is valid even with platform error
      const clientInfo = JSON.parse(api.axios.defaults.headers['X-Envoy-Client-Info'] as string);
      expect(clientInfo.platform).toBe('unknown');
    });

    it('authorization header is always set even if User-Agent generation fails', () => {
      // Simulate error in User-Agent generation
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('critical error');
      });

      const api = new EnvoyAPI({
        accessToken: testAccessToken,
        userAgent: 'MyApp/1.0.0',
      });

      // Authorization is critical and should always work
      expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
      expect(api).toBeDefined();
    });

    it('axios client remains functional even with User-Agent errors', () => {
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('critical error');
      });

      const api = new EnvoyAPI(testAccessToken);

      // Core axios functionality should work
      expect(api.axios.defaults.baseURL).toBeDefined();
      expect(api.axios.defaults.headers['Content-Type']).toBe('application/vnd.api+json');
      expect(api.axios.defaults.headers.Accept).toBe('application/vnd.api+json');
      expect((api as any).dataLoader).toBeDefined();
    });

    it('handles malformed customUserAgent gracefully', () => {
      // Even with weird input, SDK should initialize
      const weirdUserAgent = '\n\t\r' + String.fromCharCode(0) + 'weird';

      const api = new EnvoyAPI({
        accessToken: testAccessToken,
        userAgent: weirdUserAgent,
      });

      expect(api).toBeDefined();
      expect(api.axios.defaults.headers.authorization).toBe(`Bearer ${testAccessToken}`);
    });

    it('SDK never throws during initialization due to User-Agent errors', () => {
      // Even with multiple sources of errors, initialization should succeed
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('critical error');
      });

      expect(() => new EnvoyAPI(testAccessToken)).not.toThrow();
      expect(() => new EnvoyAPI({ accessToken: testAccessToken, userAgent: 'App/1.0' })).not.toThrow();
    });
  });
});
