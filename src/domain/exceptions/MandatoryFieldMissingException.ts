import { DomainError } from './DomainError';

export class MandatoryFieldMissingException extends DomainError {
  constructor(field: string) {
    super(`Mandatory field '${field}' is missing`, 400);
  }
}