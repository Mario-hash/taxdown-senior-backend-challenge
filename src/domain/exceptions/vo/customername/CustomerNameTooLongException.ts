import { DomainError } from '../../DomainError';

export class CustomerNameTooLongException extends DomainError {
    constructor(maxLength: number) {
      super(`Customer name cannot be longer than ${maxLength} characters`);
      this.name = "CustomerNameTooLongException";
    }
  }