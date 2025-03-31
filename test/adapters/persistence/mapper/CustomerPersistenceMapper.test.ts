import { CustomerPersistenceMapper } from '../../../src/adapters/persistence/CustomerPersistenceMapper';
import { Customer } from '../../../../src/domain/entities/Customer';
import { CustomerId } from '../../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../../src/domain/vo/CustomerName';
import { CustomerEmail } from '../../../../src/domain/vo/CustomerEmail';
import { AvailableCredit } from '../../../../src/domain/vo/AvailableCredit';
import { CustomerPersistence } from '../../../../src/adapters/persistence/dto/CustomerPersistence';

describe('CustomerPersistenceMapper', () => {
  it('should map a domain entity to a persistence model', () => {
    // Arrange
    const customer = new Customer(
      CustomerId.create('1'),
      CustomerName.create('Test'),
      CustomerEmail.create('test@example.com'),
      AvailableCredit.create(100)
    );
    // Act
    const persistenceModel: CustomerPersistence = CustomerPersistenceMapper.toPersistence(customer);
    // Assert.
    expect(persistenceModel).toEqual({
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      availableCredit: 100,
    });
  });

  it('should map a persistence model to a domain entity', () => {
    // Arrange
    const persistenceModel: CustomerPersistence = {
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      availableCredit: 100,
    };
    // Act
    const customer: Customer = CustomerPersistenceMapper.toDomain(persistenceModel);
    // Assert
    expect(customer.id.getValue()).toBe('1');
    expect(customer.name.getValue()).toBe('Test');
    expect(customer.email.getValue()).toBe('test@example.com');
    expect(customer.availableCredit.getValue()).toBe(100);
  });
});
