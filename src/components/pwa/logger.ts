// utils/logger.ts
import { ENVIRONMENT_CONFIG, type EnvironmentMode, type LogLevel } from './environment';
import { getEnvironmentMode } from './pwa';

/**
 * Enhanced logging utility with environment-aware log levels
 */
class Logger {
  private static instance: Logger;
  private prefix: string;
  private allowedLevels: readonly LogLevel[];
  private envMode: EnvironmentMode;

  private constructor() {
    this.envMode = getEnvironmentMode() as EnvironmentMode;
    this.prefix = ENVIRONMENT_CONFIG.logging.prefix;
    this.allowedLevels = ENVIRONMENT_CONFIG.logging.levels[this.envMode] || ['error'];
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.allowedLevels.includes(level);
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): [string, ...any[]] {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${this.prefix} [${level.toUpperCase()}] ${timestamp}: ${message}`;
    return [formattedMessage, ...args];
  }

  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(...this.formatMessage('debug', message, ...args));
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(...this.formatMessage('info', message, ...args));
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(...this.formatMessage('warn', message, ...args));
    }
  }

  public error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(...this.formatMessage('error', message, ...args));
    }
  }

  // PWA-specific logging methods
  public pwa(message: string, ...args: any[]): void {
    this.debug(`[PWA] ${message}`, ...args);
  }

  public env(message: string, ...args: any[]): void {
    this.debug(`[ENV] ${message}`, ...args);
  }

  // Performance logging
  public time(label: string): void {
    if (this.shouldLog('debug')) {
      console.time(`${this.prefix} ${label}`);
    }
  }

  public timeEnd(label: string): void {
    if (this.shouldLog('debug')) {
      console.timeEnd(`${this.prefix} ${label}`);
    }
  }

  // Group logging for complex operations
  public group(title: string): void {
    if (this.shouldLog('debug')) {
      console.group(`${this.prefix} ${title}`);
    }
  }

  public groupEnd(): void {
    if (this.shouldLog('debug')) {
      console.groupEnd();
    }
  }

  // Table logging for structured data
  public table(data: any, columns?: string[]): void {
    if (this.shouldLog('debug')) {
      console.table(data, columns);
    }
  }
}

// Create singleton instance
const logger = Logger.getInstance();

// Export convenient functions
export const log = {
  debug: (message: string, ...args: any[]) => logger.debug(message, ...args),
  info: (message: string, ...args: any[]) => logger.info(message, ...args),
  warn: (message: string, ...args: any[]) => logger.warn(message, ...args),
  error: (message: string, ...args: any[]) => logger.error(message, ...args),
  pwa: (message: string, ...args: any[]) => logger.pwa(message, ...args),
  env: (message: string, ...args: any[]) => logger.env(message, ...args),
};

// Individual exports for convenience
export const debugLog = log.debug;
export const infoLog = log.info;
export const warnLog = log.warn;
export const errorLog = log.error;
export const pwaLog = log.pwa;
export const envLog = log.env;

// Performance logging
export const timeLog = (label: string) => logger.time(label);
export const timeEndLog = (label: string) => logger.timeEnd(label);

// Group logging
export const groupLog = (title: string) => logger.group(title);
export const groupEndLog = () => logger.groupEnd();

// Table logging
export const tableLog = (data: any, columns?: string[]) => logger.table(data, columns);

// Export the main logger instance
export { logger };
