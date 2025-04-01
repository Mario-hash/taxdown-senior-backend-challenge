import { EmptyCustomerIdException } from '../exceptions/vo/customerid/EmptyCustomerIdException';
export class CustomerId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): CustomerId {
    if (!value || value.trim() === "") {
      throw new EmptyCustomerIdException();
    }
    return new CustomerId(value.trim());
  }

  public getValue(): string {
    return this.value;
  }
}
