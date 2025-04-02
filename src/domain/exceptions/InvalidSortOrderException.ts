import { DomainError } from './DomainError';

export class InvalidSortOrderException extends DomainError {
  constructor(order: string) {
    super(`The sort order '${order}' is invalid. Allowed values are 'asc' or 'desc'.`, 400);
  }
}