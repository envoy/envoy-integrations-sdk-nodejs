import os from 'os';

// Safe version extraction with fallback
let version = 'unknown';
try {
  // Import version from package.json
  // Note: In compiled code, this resolves correctly
  version = require('../../package.json').version;
} catch (error) {
  // If package.json can't be loaded, use fallback version
  // This ensures SDK initialization never fails
  // Silently fail - User-Agent is telemetry, not critical functionality
}

/**
 * Client information for detailed telemetry
 */
export interface ClientInfo {
  /** SDK name */
  sdk: string;
  /** SDK version */
  version: string;
  /** Runtime (e.g., 'node') */
  runtime: string;
  /** Runtime version (e.g., '18.0.0') */
  runtimeVersion: string;
  /** Operating system platform */
  platform: string;
  /** Optional custom application identifier (e.g., 'MyApp/1.0.0') */
  application?: string;
}

/**
 * Safely get Node.js version, with fallback
 * @returns Node.js version string without 'v' prefix
 */
function getNodeVersion(): string {
  try {
    if (process?.version) {
      return process.version.replace('v', '');
    }
  } catch (error) {
    // Ignore error, use fallback
  }
  return 'unknown';
}

/**
 * Safely get platform information, with fallback
 * @returns Platform string (e.g., 'darwin', 'linux', 'win32')
 */
function getPlatform(): string {
  try {
    return os.platform();
  } catch (error) {
    // If os.platform() fails, return fallback
    return 'unknown';
  }
}

/**
 * Build standard User-Agent header value
 * Format: envoy-integrations-sdk/2.4.4 node/18.0.0
 * With custom app: envoy-integrations-sdk/2.4.4 node/18.0.0 MyApp/1.0.0
 *
 * This function is designed to never throw exceptions. If any error occurs,
 * it returns a safe fallback value to ensure SDK initialization succeeds.
 *
 * @param customUserAgent Optional custom application identifier
 * @returns User-Agent header value (never throws)
 */
export function buildUserAgent(customUserAgent?: string): string {
  try {
    const nodeVersion = getNodeVersion();
    const baseUA = `envoy-integrations-sdk/${version} node/${nodeVersion}`;
    return customUserAgent ? `${baseUA} ${customUserAgent}` : baseUA;
  } catch (error) {
    // Critical fallback - should never happen, but ensures SDK always works
    // Silently fail - User-Agent is telemetry, not critical functionality
    return 'envoy-integrations-sdk/unknown node/unknown';
  }
}

/**
 * Build detailed client info for X-Envoy-Client-Info header
 *
 * This function is designed to never throw exceptions. If any error occurs
 * during info collection, it uses safe fallback values.
 *
 * @param customUserAgent Optional custom application identifier
 * @returns ClientInfo object (never throws)
 */
export function buildClientInfo(customUserAgent?: string): ClientInfo {
  try {
    const nodeVersion = getNodeVersion();
    const platform = getPlatform();

    const clientInfo: ClientInfo = {
      sdk: 'envoy-integrations-sdk',
      version,
      runtime: 'node',
      runtimeVersion: nodeVersion,
      platform,
    };

    // Only add application if it's a non-empty string
    if (customUserAgent) {
      clientInfo.application = customUserAgent;
    }

    return clientInfo;
  } catch (error) {
    // Critical fallback - return minimal safe info
    // Silently fail - User-Agent is telemetry, not critical functionality
    return {
      sdk: 'envoy-integrations-sdk',
      version: 'unknown',
      runtime: 'node',
      runtimeVersion: 'unknown',
      platform: 'unknown',
    };
  }
}

/**
 * Build X-Envoy-Client-Info header value (JSON string)
 *
 * This function is designed to never throw exceptions. If JSON serialization
 * fails, it returns a minimal safe JSON string.
 *
 * @param customUserAgent Optional custom application identifier
 * @returns JSON string for X-Envoy-Client-Info header (never throws)
 */
export function buildClientInfoHeader(customUserAgent?: string): string {
  try {
    const clientInfo = buildClientInfo(customUserAgent);
    return JSON.stringify(clientInfo);
  } catch (error) {
    // Critical fallback - return minimal valid JSON
    // Silently fail - User-Agent is telemetry, not critical functionality
    // Return minimal valid JSON that won't break parsing
    return '{"sdk":"envoy-integrations-sdk","version":"unknown","runtime":"node","runtimeVersion":"unknown","platform":"unknown"}';
  }
}
