import { ICustomerRepository } from '../../domain/repository/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';

export class EmbebedCustomerRepository implements ICustomerRepository {
  private customers: Map<string, Customer> = new Map();

  async create(customer: Customer): Promise<Customer> {
    this.customers.set(customer.id.getValue(), customer);
    return customer;
  }

  async findById(customerId: CustomerId): Promise<Customer | null> {
    return this.customers.get(customerId.getValue()) || null;
  }

  async update(customer: Customer): Promise<Customer> {
    this.customers.set(customer.id.getValue(), customer);
    return customer;
  }

  async delete(customerId: CustomerId): Promise<void> {
    this.customers.delete(customerId.getValue());
  }

  async findAll(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }
}