export class CustomerEmail {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): CustomerEmail {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email format");
    }
    return new CustomerEmail(value);
  }

  public getValue(): string {
    return this.value;
  }
}
