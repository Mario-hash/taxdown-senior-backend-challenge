import { NegativeCreditException } from '../exceptions/vo/availablecredit/NegativeCreditException';
export class AvailableCredit {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: any): AvailableCredit {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('AvailableCredit must be a number');
    }
    if (value < 0) {
      throw new NegativeCreditException(value);
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
