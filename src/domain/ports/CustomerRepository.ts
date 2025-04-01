import { Customer } from '../entities/Customer';
import { CustomerEmail } from '../vo/CustomerEmail';
import { CustomerId } from '../vo/CustomerId';

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(customerId: CustomerId): Promise<void>;
  findById(customerId: CustomerId): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  findByEmail(email: CustomerEmail): Promise<Customer | null>;
}