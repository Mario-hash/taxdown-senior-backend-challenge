export class CustomerName {
  private readonly value: string;
  private static readonly MAX_LENGTH = 50;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(name: string): CustomerName {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length === 0) {
      throw new Error("Invalid CustomerName");
    }
    if (trimmed.length > CustomerName.MAX_LENGTH) {
      throw new Error("Invalid CustomerName");
    }
    return new CustomerName(trimmed);
  }

  public getValue(): string {
    return this.value;
  }
}
