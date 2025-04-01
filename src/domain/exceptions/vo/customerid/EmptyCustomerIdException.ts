import { DomainError } from '../../DomainError';

export class EmptyCustomerIdException extends DomainError {
  constructor() {
    super('Customer ID cannot be empty or blank');
  }
}