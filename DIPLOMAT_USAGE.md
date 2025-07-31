# Diplomat Tunnel Integration

The SDK now supports automatic routing of HTTP requests through the Diplomat tunnel when properly configured. This allows integrations to connect to customer endpoints behind NAT/firewalls without requiring public IP addresses.

## Environment Variables

To enable diplomat routing, set these environment variables in your integration:

```bash
DIPLOMAT_SERVER_AUTH_USERNAME=your-basic-auth-username
DIPLOMAT_SERVER_AUTH_PASSWORD=your-basic-auth-password

# Optional: Plugin ID for validation (recommended for performance)
DIPLOMAT_PLUGIN_ID=your-plugin-id

# Optional: If you know the client ID and internal URL statically
DIPLOMAT_CLIENT_ID=your-client-id
DIPLOMAT_INTERNAL_URL=http://192.168.1.100:8080  # Customer's internal endpoint
```

Diplomat routing is automatically enabled when authentication credentials are provided. If `DIPLOMAT_PLUGIN_ID` is set, the SDK will validate that your plugin supports diplomat routing.

**Note:** The diplomat server URL is automatically inferred by the SDK:
- **Production**: `https://diplomat-server.envoy.com` (when `NODE_ENV=production`, `ENVIRONMENT=production`, or `ENV=production`)
- **All other environments**: `https://diplomat-server.envoy.christmas` (staging, development, test, etc.)

## Usage

### Basic Usage (Automatic Diplomat Routing)

```typescript
import { createAxiosClient } from '@envoy/integrations-sdk-nodejs';

// Create an axios client with your integration's install ID
const client = createAxiosClient({
  baseURL: 'https://customer-system.com',
  timeout: 30000,
  headers: {
    'User-Agent': 'My Integration'
  },
  installId: 'your-plugin-install-id' // SDK automatically fetches diplomat config
});

// Make requests normally - they will be routed through diplomat if configured
const response = await client.get('/api/data');
```

### Advanced Usage (Custom Client Install Function)

For advanced use cases where you need custom logic for fetching diplomat client install info:

```typescript
import { createAxiosClient, DiplomatClientInstall } from '@envoy/integrations-sdk-nodejs';

// Function to fetch diplomat client install info with custom logic
async function getDiplomatClientInstall(): Promise<DiplomatClientInstall | null> {
  try {
    // Custom logic to get diplomat install info
    const response = await fetch(`/api/custom-diplomat-logic`);
    const data = await response.json();

    return {
      enabled: data.enabled,
      client_id: data.client_id,
      internal_url: data.internal_url
    };
  } catch (error) {
    console.warn('Failed to get diplomat install info:', error);
    return null;
  }
}

// Create axios client with custom diplomat config function
const client = createAxiosClient({
  baseURL: 'https://customer-system.com',
  timeout: 30000,
  getDiplomatClientInstall: getDiplomatClientInstall
});

// Requests will be routed through diplomat if the install is enabled
const response = await client.post('/api/action', { data: 'example' });
```

### Static Client Install Info

For cases where you have static diplomat configuration:

```typescript
import { createAxiosClient } from '@envoy/integrations-sdk-nodejs';

const client = createAxiosClient({
  baseURL: 'https://customer-system.com',
  timeout: 30000,
  diplomatClientInstall: {
    enabled: true,
    client_id: 'abc-123-def-456',
    internal_url: 'http://192.168.1.100:8080'
  }
});
```

## How It Works

1. **Environment Check**: The SDK checks for diplomat environment variables
2. **Request Routing**: When making HTTP requests, the SDK determines if they should be routed through diplomat
3. **Tunnel Communication**: If diplomat is enabled, requests are wrapped and sent to the diplomat server
4. **Response Processing**: The diplomat server forwards the request to the customer's internal endpoint and returns the response
5. **Fallback**: If diplomat routing fails, the SDK falls back to making direct requests

## Request Flow

```
Integration -> SDK -> Diplomat Server -> Diplomat Client -> Customer Endpoint
                                              ^
                                              |
                                    (VPN/Tunnel connection)
```

## Migration from Custom Diplomat Implementation

If you have an existing integration with custom diplomat code (like Kantech), you can migrate by:

1. Removing your custom `routeAxiosRequest` method
2. Setting the diplomat environment variables
3. Replacing your custom axios client creation with `createAxiosClient()`
4. All existing HTTP calls will automatically use diplomat when configured

## Debugging

The SDK logs diplomat routing decisions to the console:
- `"Routing request through diplomat tunnel"` - Request will use diplomat
- `"Diplomat routing failed, falling back to direct request"` - Fallback to direct request
- `"Routing request through diplomat: {...}"` - Full diplomat task configuration

## Performance Notes

The SDK caches diplomat client install info per axios instance to avoid repeated API calls. If you provide `DIPLOMAT_PLUGIN_ID`, the SDK will check once if your plugin supports diplomat routing.

## Error Handling

The SDK includes automatic fallback behavior:
- If diplomat configuration is missing or invalid, requests go direct
- If diplomat routing fails, requests fall back to direct connection
- All errors are properly sanitized to remove PII before being thrown