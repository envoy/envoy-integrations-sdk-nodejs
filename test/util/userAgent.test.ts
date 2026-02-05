import os from 'os';
import { buildUserAgent, buildClientInfo, buildClientInfoHeader } from '../../src/util/userAgent';

// Mock the package.json version
jest.mock('../../package.json', () => ({
  version: '2.4.4',
}));

describe('userAgent utilities', () => {
  const originalProcessVersion = process.version;
  const originalPlatform = os.platform;
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn();
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

  describe('buildUserAgent', () => {
    it('builds standard User-Agent without custom application', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });

      const result = buildUserAgent();

      expect(result).toBe('envoy-integrations-sdk/2.4.4 node/18.0.0');
    });

    it('builds User-Agent with custom application identifier', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });

      const result = buildUserAgent('MyApp/1.0.0');

      expect(result).toBe('envoy-integrations-sdk/2.4.4 node/18.0.0 MyApp/1.0.0');
    });

    it('handles Node.js version without v prefix', () => {
      Object.defineProperty(process, 'version', {
        value: '18.0.0',
        writable: true,
      });

      const result = buildUserAgent();

      expect(result).toBe('envoy-integrations-sdk/2.4.4 node/18.0.0');
    });

    it('handles different Node.js versions', () => {
      Object.defineProperty(process, 'version', {
        value: 'v20.5.1',
        writable: true,
      });

      const result = buildUserAgent();

      expect(result).toBe('envoy-integrations-sdk/2.4.4 node/20.5.1');
    });

    it('handles empty custom user agent', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });

      const result = buildUserAgent('');

      // Empty string is falsy, so it's treated as no custom user agent
      expect(result).toBe('envoy-integrations-sdk/2.4.4 node/18.0.0');
    });
  });

  describe('buildClientInfo', () => {
    it('builds client info without custom application', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfo();

      expect(result).toEqual({
        sdk: 'envoy-integrations-sdk',
        version: '2.4.4',
        runtime: 'node',
        runtimeVersion: '18.0.0',
        platform: 'darwin',
      });
    });

    it('builds client info with custom application', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfo('MyApp/1.0.0');

      expect(result).toEqual({
        sdk: 'envoy-integrations-sdk',
        version: '2.4.4',
        runtime: 'node',
        runtimeVersion: '18.0.0',
        platform: 'darwin',
        application: 'MyApp/1.0.0',
      });
    });

    it('handles different platforms', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('linux');

      const result = buildClientInfo();

      expect(result).toEqual({
        sdk: 'envoy-integrations-sdk',
        version: '2.4.4',
        runtime: 'node',
        runtimeVersion: '18.0.0',
        platform: 'linux',
      });
    });

    it('handles Windows platform', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('win32');

      const result = buildClientInfo();

      expect(result).toEqual({
        sdk: 'envoy-integrations-sdk',
        version: '2.4.4',
        runtime: 'node',
        runtimeVersion: '18.0.0',
        platform: 'win32',
      });
    });

    it('does not include application field when custom user agent is empty string', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfo('');

      // Empty string is falsy, so application field is not included
      expect(result).toEqual({
        sdk: 'envoy-integrations-sdk',
        version: '2.4.4',
        runtime: 'node',
        runtimeVersion: '18.0.0',
        platform: 'darwin',
      });
    });
  });

  describe('buildClientInfoHeader', () => {
    it('builds JSON string without custom application', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfoHeader();

      expect(result).toBe(
        '{"sdk":"envoy-integrations-sdk","version":"2.4.4","runtime":"node","runtimeVersion":"18.0.0","platform":"darwin"}',
      );
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('builds JSON string with custom application', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfoHeader('MyApp/1.0.0');

      expect(result).toBe(
        '{"sdk":"envoy-integrations-sdk","version":"2.4.4","runtime":"node","runtimeVersion":"18.0.0","platform":"darwin","application":"MyApp/1.0.0"}',
      );
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('returns valid JSON that can be parsed', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfoHeader('MyApp/1.0.0');
      const parsed = JSON.parse(result);

      expect(parsed).toEqual({
        sdk: 'envoy-integrations-sdk',
        version: '2.4.4',
        runtime: 'node',
        runtimeVersion: '18.0.0',
        platform: 'darwin',
        application: 'MyApp/1.0.0',
      });
    });

    it('handles special characters in application name', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      const result = buildClientInfoHeader('My App & Service/1.0.0');

      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(parsed.application).toBe('My App & Service/1.0.0');
    });
  });

  describe('error handling and resilience', () => {
    it('buildUserAgent handles missing process.version gracefully', () => {
      // Simulate missing process.version
      const originalVersion = process.version;
      delete (process as any).version;

      const result = buildUserAgent();

      expect(result).toContain('envoy-integrations-sdk');
      expect(result).toContain('node/unknown');

      // Restore
      Object.defineProperty(process, 'version', {
        value: originalVersion,
        writable: true,
      });
    });

    it('buildClientInfo never throws - returns fallback on os.platform error', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });

      // Mock os.platform to throw
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('platform error');
      });

      const result = buildClientInfo();

      expect(result.platform).toBe('unknown');
      expect(result.sdk).toBe('envoy-integrations-sdk');
    });

    it('buildClientInfoHeader returns valid JSON even with errors', () => {
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('platform error');
      });

      const result = buildClientInfoHeader();

      // Should return valid JSON even on error
      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(parsed.sdk).toBe('envoy-integrations-sdk');
    });

    it('buildClientInfoHeader handles JSON.stringify failure with fallback', () => {
      Object.defineProperty(process, 'version', {
        value: 'v18.0.0',
        writable: true,
      });
      os.platform = jest.fn().mockReturnValue('darwin');

      // Mock JSON.stringify to fail (edge case, but we should handle it)
      const originalStringify = JSON.stringify;
      JSON.stringify = jest.fn().mockImplementation(() => {
        throw new Error('stringify failed');
      });

      const result = buildClientInfoHeader();

      // Should return fallback valid JSON string
      expect(result).toBe('{"sdk":"envoy-integrations-sdk","version":"unknown","runtime":"node","runtimeVersion":"unknown","platform":"unknown"}');
      expect(() => JSON.parse(result)).not.toThrow();

      // Restore
      JSON.stringify = originalStringify;
    });

    it('functions never throw exceptions', () => {
      // Even with os.platform throwing, functions should not throw
      os.platform = jest.fn().mockImplementation(() => {
        throw new Error('critical error');
      });

      expect(() => buildUserAgent()).not.toThrow();
      expect(() => buildClientInfo()).not.toThrow();
      expect(() => buildClientInfoHeader()).not.toThrow();
    });
  });
});
