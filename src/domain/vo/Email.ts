export class Email {
    private readonly value: string;
  
    constructor(value: string) {
      if (!this.isValidEmail(value)) {
        throw new Error('Invalid email format');
      }
      this.value = value;
    }
  
    private isValidEmail(value: string): boolean {
      return /\S+@\S+\.\S+/.test(value);
    }
  
    public getValue(): string {
      return this.value;
    }
  }