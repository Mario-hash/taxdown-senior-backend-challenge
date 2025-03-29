import { ICustomerRepository } from '../../domain/repository/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';

export class CustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  async addCredit(customerId: string, amount: number): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error(`Customer with id ${customerId} not found`);
    }
    customer.addCredit(amount);
    return this.customerRepository.update(customer);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    return this.customerRepository.findById(customerId);
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    return this.customerRepository.update(customer);
  }

  async deleteCustomer(customerId: string): Promise<void> {
    return this.customerRepository.delete(customerId);
  }
}