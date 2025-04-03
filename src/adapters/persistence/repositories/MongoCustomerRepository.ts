import { Collection } from 'mongodb';
import { CustomerRepository } from '../../../domain/ports/CustomerRepository';
import { Customer } from '../../../domain/entities/Customer';
import { CustomerId } from '../../../domain/vo/CustomerId';
import { CustomerEmail } from '../../../domain/vo/CustomerEmail';
import { CustomerPersistenceMapper } from '../mapper/CustomerPersistenceMapper';
import { CustomerPersistence } from '../dto/CustomerPersistence';

export class MongoCustomerRepository implements CustomerRepository {
  constructor(private readonly collection: Collection<CustomerPersistence>) {}

  async create(customer: Customer): Promise<Customer> {
    const persistence = CustomerPersistenceMapper.toPersistence(customer);
    await this.collection.insertOne(persistence);
    return customer;
  }

  async findById(customerId: CustomerId): Promise<Customer | null> {
    const doc = await this.collection.findOne({ _id: customerId.getValue() });
    return doc ? CustomerPersistenceMapper.toDomain(doc) : null;
  }

  async update(customer: Customer): Promise<Customer> {
    const persistence = CustomerPersistenceMapper.toPersistence(customer);
    await this.collection.updateOne(
      { _id: persistence._id },
      { $set: persistence }
    );
    return customer;
  }

  async delete(customerId: CustomerId): Promise<void> {
    await this.collection.deleteOne({ _id: customerId.getValue() });
  }

  async findAll(): Promise<Customer[]> {
    const docs = await this.collection.find().toArray();
    return docs.map(CustomerPersistenceMapper.toDomain);
  }

  async findByEmail(email: CustomerEmail): Promise<Customer | null> {
    const doc = await this.collection.findOne({ email: email.getValue() });
    return doc ? CustomerPersistenceMapper.toDomain(doc) : null;
  }
}
