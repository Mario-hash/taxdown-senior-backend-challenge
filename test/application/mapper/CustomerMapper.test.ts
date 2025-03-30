import { CustomerMapper } from '../../../src/application/mapper/CustomerMapper';
import { CustomerDTO } from '../../../src/application/dto/CustomerDTO';
import { Customer } from '../../../src/domain/entities/Customer';
import { Email } from '../../../src/domain/vo/Email';
import { CustomerId } from '../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../src/domain/vo/CustomerName';
import { AvailableCredit } from '../../../src/domain/vo/AvailableCredit';

describe('CustomerMapper', () => {
  it('should map CustomerDTO to Customer entity', () => {
    // Arrange
    const dto: CustomerDTO = {
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      availableCredit: 100
    };

    // Act
    const customer: Customer = CustomerMapper.toDomain(dto);

    // Assert
    expect(customer.id).toBeInstanceOf(CustomerId);
    expect(customer.id.getValue()).toBe('1');
    expect(customer.name).toBeInstanceOf(CustomerName);
    expect(customer.name.getValue()).toBe('Test');
    expect(customer.email).toBeInstanceOf(Email);
    expect(customer.email.getValue()).toBe('test@example.com');
    expect(customer.availableCredit).toBeInstanceOf(AvailableCredit);
    expect(customer.availableCredit.getValue()).toBe(100);
  });

  it('should map Customer entity to CustomerDTO', () => {
    // Arrange
    const customer = new Customer(
      new CustomerId('1'),
      new CustomerName('Test'),
      new Email('test@example.com'),
      new AvailableCredit(100)
    );

    // Act
    const dto: CustomerDTO = CustomerMapper.toDTO(customer);

    // Assert
    expect(dto).toEqual({
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      availableCredit: 100
    });
  });
});
