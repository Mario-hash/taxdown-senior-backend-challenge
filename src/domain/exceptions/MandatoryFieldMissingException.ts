import { DomainError } from './DomainError';

export class MandatoryFieldMissingException extends DomainError {
  constructor(fields: string) {
    super(`Mandatory field(s) missing: ${fields}`, 400);
  }
}