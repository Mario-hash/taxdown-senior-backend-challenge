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
import { InvalidSortOrderException } from '../../domain/exceptions/InvalidSortOrderException';
import { CustomerHasPositiveCreditException } from '../../domain/exceptions/CustomerHasPositiveCreditException';

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

  async deleteCustomer(customerId: CustomerId): Promise<Either<CustomerHasPositiveCreditException, void>> {
    const customer = await this.customerRepository.findById(customerId);

    if (customer && customer.availableCredit.getValue() > 0) {
      return Either.left(new CustomerHasPositiveCreditException(customerId.getValue(), customer.availableCredit.getValue()));
    }
    
    await this.customerRepository.delete(customerId);
    return Either.right(undefined);
  }

  async listCustomersSortedByCredit(order: string = 'desc'): Promise<Either<InvalidSortOrderException, Customer[]>> {

    if (order !== 'asc' && order !== 'desc') {
      return Either.left(new InvalidSortOrderException(order));
    }
    
    const customers = await this.customerRepository.findAll();
    const sorted = customers.sort((a, b) => {
      const diff = a.availableCredit.getValue() - b.availableCredit.getValue();
      return order === 'asc' ? diff : -diff;
    });
  
    return Either.right(sorted);
  }
}