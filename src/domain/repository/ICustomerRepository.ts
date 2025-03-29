import { Customer } from '../entities/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(customerId: string): Promise<void>;
  findById(customerId: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
}