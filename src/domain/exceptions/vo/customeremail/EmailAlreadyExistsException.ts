import { DomainError } from '../../DomainError';

export class EmailAlreadyExistsException extends DomainError {
  constructor(email: string) {
    super(`The email '${email}' is already in use`, 409);
  }
}