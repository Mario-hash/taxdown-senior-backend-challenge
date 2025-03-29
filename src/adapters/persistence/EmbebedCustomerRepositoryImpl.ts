import { ICustomerRepository } from '../../domain/repository/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';

export class EmbebedCustomerRepository implements ICustomerRepository {
  private customers: Map<string, Customer> = new Map();

  async create(customer: Customer): Promise<Customer> {
    this.customers.set(customer.id, customer);
    return customer;
  }

  async findById(customerId: string): Promise<Customer | null> {
    return this.customers.get(customerId) || null;
  }
}