import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log(`[${context || 'Application'}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[${context || 'Error'}] ${message}`);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    console.warn(`[${context || 'Warning'}] ${message}`);
  }

  debug(message: string, context?: string) {
    console.debug(`[${context || 'Debug'}] ${message}`);
  }

  verbose(message: string, context?: string) {
    console.log(`[${context || 'Verbose'}] ${message}`);
  }
}
