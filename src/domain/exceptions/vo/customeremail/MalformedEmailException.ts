import { DomainError } from '../../DomainError';

export class MalformedEmailException extends DomainError {
  constructor(email: string) {
    super(`The provided email '${email}' is not in a valid format`, 400);
  }
}