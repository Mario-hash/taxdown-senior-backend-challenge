import { MalformedEmailException } from "../exceptions/vo/customeremail/MalformedEmailException";

export class CustomerEmail {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): CustomerEmail {
    const normalized = value.toLowerCase();
    const emailRegex = /^(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(normalized)) {
      throw new MalformedEmailException(normalized);
    }
    return new CustomerEmail(normalized);
  }

  public getValue(): string {
    return this.value;
  }
}
