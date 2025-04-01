import { EmptyCustomerNameException } from '../exceptions/vo/customername/EmptyCustomerNameException';
import { CustomerNameTooLongException } from '../exceptions/vo/customername/CustomerNameTooLongException';
export class CustomerName {
  private readonly value: string;
  private static readonly MAX_LENGTH = 50;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(name: string): CustomerName {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length === 0) {
      throw new EmptyCustomerNameException();
    }
    if (trimmed.length > CustomerName.MAX_LENGTH) {
      throw new CustomerNameTooLongException(CustomerName.MAX_LENGTH);
    }
    return new CustomerName(trimmed);
  }

  public getValue(): string {
    return this.value;
  }
}
