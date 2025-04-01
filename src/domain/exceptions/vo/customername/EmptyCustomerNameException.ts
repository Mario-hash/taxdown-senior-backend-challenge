import { DomainError } from '../../DomainError';

export class EmptyCustomerNameException extends DomainError {
  constructor() {
    super('Customer name cannot be empty or blank', 400);
  }
}