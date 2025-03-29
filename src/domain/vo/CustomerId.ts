export class CustomerId {
    private readonly value: string;
  
    constructor(value: string) {
      if (!value || value.trim() === "") {
        throw new Error('Invalid CustomerId');
      }
      this.value = value.trim();
    }
  
    public getValue(): string {
      return this.value;
    }
  }