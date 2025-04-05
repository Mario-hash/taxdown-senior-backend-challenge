import { DomainError } from '../../DomainError';

export class TooManyDecimalsAvailableCreditException extends DomainError {
  constructor(value: number) {
    super(`AvailableCredit value ${value} has more than two decimals.`, 400);
  }
}