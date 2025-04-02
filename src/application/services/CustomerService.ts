import { CustomerRepository } from '../../domain/ports/CustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';
import { NotFoundError } from '../../domain/exceptions/NotFoundError';
import { EmailAlreadyExistsException } from '../../domain/exceptions/EmailAlreadyExistsException';
import { DuplicateCustomerIdException } from '../../domain/exceptions/DuplicateCustomerIdException';
import { Either } from '../../shared/Either';
import { CustomerDTO } from '../dto/CustomerDTO';
import { CustomerMapper } from '../mapper/CustomerMapper';
import { CustomerEmail } from '../../domain/vo/CustomerEmail';

export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async addCredit(customerId: CustomerId, amount: AvailableCredit): Promise<Either<NotFoundError, Customer>> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      return Either.left(new NotFoundError('Customer', customerId.getValue()));
    }
    customer.addCredit(amount);
    const updated = await this.customerRepository.update(customer);
    return Either.right(updated);
  }

  async createCustomer(customer: Customer): Promise<Either<DuplicateCustomerIdException | EmailAlreadyExistsException, Customer>> {
    const existingById = await this.customerRepository.findById(customer.id);
    if (existingById) {
      return Either.left(new DuplicateCustomerIdException(customer.id.getValue()));
    }
    const existingByEmail = await this.customerRepository.findByEmail(customer.email);
    if (existingByEmail) {
      return Either.left(new EmailAlreadyExistsException(customer.email.getValue()));
    }
    const created = await this.customerRepository.create(customer);
    return Either.right(created);
  }

  async getCustomer(customerId: CustomerId): Promise<Either<NotFoundError, Customer>> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      return Either.left(new NotFoundError('Customer', customerId.getValue()));
    }
    return Either.right(customer);
  }

  async updateCustomer(id: string, updateData: Partial<CustomerDTO>): Promise<Either<NotFoundError, Customer>> {
    const customerId = CustomerId.create(id);
    const existing = await this.customerRepository.findById(customerId);
  
    if (!existing) {
      return Either.left(new NotFoundError('Customer', customerId.getValue()));
    }

    const newEmail = updateData.email ?? existing.email.getValue();
    const sameEmail = existing.email.getValue() === newEmail;
    
    if (!sameEmail) {
      const existingByEmail = await this.customerRepository.findByEmail(CustomerEmail.create(newEmail));
      if (existingByEmail) {
        return Either.left(new EmailAlreadyExistsException(newEmail));
      }
    }
  
    const updatedDTO: CustomerDTO = {
      id,
      name: updateData.name ?? existing.name.getValue(),
      email: updateData.email ?? existing.email.getValue(),
      availableCredit: updateData.availableCredit !== undefined
        ? updateData.availableCredit
        : existing.availableCredit.getValue(),
    };
  
    const updatedEntity = CustomerMapper.toDomain(updatedDTO);
    const updated = await this.customerRepository.update(updatedEntity);
    return Either.right(updated);
  }

  async deleteCustomer(customerId: CustomerId): Promise<void> {
    return this.customerRepository.delete(customerId);
  }

  async listCustomersSortedByCredit(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();
    return customers.sort((a, b) => b.availableCredit.getValue() - a.availableCredit.getValue());
  }
}