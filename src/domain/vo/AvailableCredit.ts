export class AvailableCredit {
    private readonly value: number;
  
    constructor(value: number) {
      if (value < 0) {
        throw new Error('AvailableCredit cannot be negative');
      }
      this.value = value;
    }
  
    public getValue(): number {
      return this.value;
    }
  
    public add(amount: number): AvailableCredit {
      return new AvailableCredit(this.value + amount);
    }
  }