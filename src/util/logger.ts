/* eslint-disable no-console */
/**
 * Simple structured logger for diplomat operations
 */
export class Logger {
  constructor(private context: Record<string, unknown> = {}) {}

  debug(message: string, metadata?: Record<string, unknown>) {
    console.log(JSON.stringify({
      level: 'debug',
      message,
      ...this.context,
      ...metadata,
      timestamp: new Date().toISOString(),
    }));
  }

  warn(message: string, metadata?: Record<string, unknown>) {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      ...this.context,
      ...metadata,
      timestamp: new Date().toISOString(),
    }));
  }

  info(message: string, metadata?: Record<string, unknown>) {
    console.log(JSON.stringify({
      level: 'info',
      message,
      ...this.context,
      ...metadata,
      timestamp: new Date().toISOString(),
    }));
  }

  error(message: string, metadata?: Record<string, unknown>) {
    console.error(JSON.stringify({
      level: 'error',
      message,
      ...this.context,
      ...metadata,
      timestamp: new Date().toISOString(),
    }));
  }

  child(context: Record<string, unknown>): Logger {
    return new Logger({ ...this.context, ...context });
  }
}

export const rootLogger = new Logger();
