export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Email {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email format");
    }
    return new Email(value);
  }

  public getValue(): string {
    return this.value;
  }
}
