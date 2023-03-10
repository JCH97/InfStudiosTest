import { Logger } from '@nestjs/common';
import { IResultError } from '../interfaces/IResultError';

type BaseErrorProps = {
  name: string;
  message: string;
  context?: string;
};

export abstract class BaseError extends Error implements IResultError {
  constructor({ name, message, context }: BaseErrorProps) {
    super(message);
    // Logger.error(`${message}`, null, context);
    Object.defineProperty(this, 'name', { value: name });
  }

  throw(): void {
    throw this;
  }

  pretty(): string {
    return `[${this.name}]: ${this.message}`;
  }
}
