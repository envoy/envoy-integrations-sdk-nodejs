import dotenv from 'dotenv-flow';

dotenv.config();
export const envoyBaseURL = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
export const envoyClientId = process.env.ENVOY_CLIENT_ID as string;
export const envoyClientSecret = process.env.ENVOY_CLIENT_SECRET as string;
export const jwtSecret = process.env.JWT_SECRET as string;
