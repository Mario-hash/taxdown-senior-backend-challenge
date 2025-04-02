import { CustomerRepository } from '../../../domain/ports/CustomerRepository';
import { Customer } from '../../../domain/entities/Customer';
import { CustomerId } from '../../../domain/vo/CustomerId';
import { CustomerEmail } from '../../../domain/vo/CustomerEmail';
import { CustomerPersistence } from '../dto/CustomerPersistence';
import { CustomerPersistenceMapper } from '../mapper/CustomerPersistenceMapper';

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Map<string, CustomerPersistence> = new Map();

  async create(customer: Customer): Promise<Customer> {
    const persistence = CustomerPersistenceMapper.toPersistence(customer);
    this.customers.set(persistence.id, persistence);
    return customer;
  }

  async findById(customerId: CustomerId): Promise<Customer | null> {
    const found = this.customers.get(customerId.getValue());
    return found ? CustomerPersistenceMapper.toDomain(found) : null;
  }

  async update(customer: Customer): Promise<Customer> {
    const persistence = CustomerPersistenceMapper.toPersistence(customer);
    this.customers.set(persistence.id, persistence);
    return customer;
  }

  async delete(customerId: CustomerId): Promise<void> {
    this.customers.delete(customerId.getValue());
  }

  async findAll(): Promise<Customer[]> {
    return Array.from(this.customers.values()).map(CustomerPersistenceMapper.toDomain);
  }

  async findByEmail(email: CustomerEmail): Promise<Customer | null> {
    const all = Array.from(this.customers.values());
    const found = all.find(p => p.email === email.getValue());
    return found ? CustomerPersistenceMapper.toDomain(found) : null;
  }
}