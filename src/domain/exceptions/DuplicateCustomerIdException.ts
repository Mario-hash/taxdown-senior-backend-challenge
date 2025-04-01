import { DomainError } from './DomainError';

export class DuplicateCustomerIdException extends DomainError {
  constructor(id: string) {
    super(`Customer with id ${id} already exists`, 409);
  }
}