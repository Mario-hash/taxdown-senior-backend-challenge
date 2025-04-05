import { DomainError } from './DomainError';

export class CustomerHasPositiveCreditException extends DomainError {
  constructor(customerId: string, credit: number) {
    super(`Customer with id ${customerId} cannot be deleted because available credit is greater than zero (${credit}).`, 400);
  }
}