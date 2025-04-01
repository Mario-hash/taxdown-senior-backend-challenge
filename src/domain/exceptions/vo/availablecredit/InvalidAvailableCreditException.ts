import { DomainError } from '../../DomainError';

export class InvalidAvailableCreditException extends DomainError {
    constructor() {
      super('AvailableCredit must be a number', 400);
    }
  }