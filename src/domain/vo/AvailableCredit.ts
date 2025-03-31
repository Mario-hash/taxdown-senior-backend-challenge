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
      throw new Error('AvailableCredit cannot be negative');
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
