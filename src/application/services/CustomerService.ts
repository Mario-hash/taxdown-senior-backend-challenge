import { CustomerRepository } from '../../domain/ports/CustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';
import { NotFoundError } from '../../domain/exceptions/NotFoundError';
import { EmailAlreadyExistsException } from '../../domain/exceptions/vo/customeremail/EmailAlreadyExistsException';
import { DuplicateCustomerIdException } from '../../domain/exceptions/vo/customerid/DuplicateCustomerIdException';

export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async addCredit(customerId: CustomerId, amount: AvailableCredit): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundError('Customer', customerId.getValue());
    }
    customer.addCredit(amount);
    return this.customerRepository.update(customer);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const existingById = await this.customerRepository.findById(customer.id);
    if (existingById) {
      throw new DuplicateCustomerIdException(customer.id.getValue());
    }
    const existingByEmail = await this.customerRepository.findByEmail(customer.email);
    if (existingByEmail) {
      throw new EmailAlreadyExistsException(customer.email.getValue());
    }
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