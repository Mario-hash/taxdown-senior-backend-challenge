import { DomainError } from '../../DomainError';

export class NegativeCreditException extends DomainError {
  constructor(value: number) {
    super(`AvailableCredit: '${value}' cannot be negative`, 400);
  }
}