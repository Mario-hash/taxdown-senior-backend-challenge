export class CustomerName {
    private readonly value: string;
    private static MAX_LENGTH = 50;
  
    constructor(name: string) {
      const trimmed = name.trim();
      if (!trimmed) {
        throw new Error('Invalid CustomerName');
      }
      if (trimmed.length > CustomerName.MAX_LENGTH) {
        throw new Error('Invalid CustomerName');
      }
      this.value = trimmed;
    }
  
    public getValue(): string {
      return this.value;
    }
  }