import { Response } from 'express';

export default interface EnvoyResponse extends Response {
  sendOngoing: (data: any) => void;
  sendIgnored: (message: string, data?: Record<string, any>) => void;
  sendFailed: (message: string, data?: Record<string, any>) => void;
}
