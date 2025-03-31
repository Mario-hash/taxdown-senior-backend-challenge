export class CustomerId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): CustomerId {
    if (!value || value.trim() === "") {
      throw new Error("Invalid CustomerId");
    }
    return new CustomerId(value.trim());
  }

  public getValue(): string {
    return this.value;
  }
}
