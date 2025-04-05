import { InvalidAvailableCreditException } from '../exceptions/vo/availablecredit/InvalidAvailableCreditException';
import { NegativeCreditException } from '../exceptions/vo/availablecredit/NegativeCreditException';
import { TooManyDecimalsAvailableCreditException } from '../exceptions/vo/availablecredit/TooManyDecimalsAvailableCreditException ';
export class AvailableCredit {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: any): AvailableCredit {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new InvalidAvailableCreditException();
    }
    if (value < 0) {
      throw new NegativeCreditException(value);
    }
    if (!Number.isInteger(value * 100)) {
      throw new TooManyDecimalsAvailableCreditException(value);
    }
    return new AvailableCredit(value);
  }

  public getValue(): number {
    return this.value;
  }

  public add(amount: number): AvailableCredit {
    return AvailableCredit.create(this.value + amount);
  }
}
