import { ICustomerRepository } from '../../domain/repository/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';

export class CustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  async addCredit(customerId: CustomerId, amount: AvailableCredit): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error(`Customer with id ${customerId.getValue()} not found`);
    }
    customer.addCredit(amount);
    return this.customerRepository.update(customer);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  async getCustomer(customerId: CustomerId): Promise<Customer | null> {
    return this.customerRepository.findById(customerId);
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    return this.customerRepository.update(customer);
  }

  async deleteCustomer(customerId: CustomerId): Promise<void> {
    return this.customerRepository.delete(customerId);
  }

  async listCustomersSortedByCredit(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();
    return customers.sort((a, b) => b.availableCredit.getValue() - a.availableCredit.getValue());
  }
}