import { CustomerMapper } from '../../../src/application/mapper/CustomerMapper';
import { CustomerDTO } from '../../../src/application/dto/CustomerDTO';
import { Customer } from '../../../src/domain/entities/Customer';
import { CustomerEmail } from '../../../src/domain/vo/CustomerEmail';
import { CustomerId } from '../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../src/domain/vo/CustomerName';
import { AvailableCredit } from '../../../src/domain/vo/AvailableCredit';
import { MandatoryFieldMissingException } from '../../../src/domain/exceptions/MandatoryFieldMissingException';


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
    expect(customer.email).toBeInstanceOf(CustomerEmail);
    expect(customer.email.getValue()).toBe('test@example.com');
    expect(customer.availableCredit).toBeInstanceOf(AvailableCredit);
    expect(customer.availableCredit.getValue()).toBe(100);
  });

  it('should map Customer entity to CustomerDTO', () => {
    // Arrange
    const customer = new Customer(
      CustomerId.create('1'),
      CustomerName.create('Test'),
      CustomerEmail.create('test@example.com'),
      AvailableCredit.create(100)
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

  it('should throw an error if the email field is missing', () => {
    // Arrange
    const incompleteDto = {
      id: "5",
      name: "Test5"
    };

    // Act & Assert
    expect(() => CustomerMapper.toDomain(incompleteDto as any))
      .toThrow(new MandatoryFieldMissingException('email').message);
  });

  it('should throw an error if the id field is missing', () => {
    // Arrange
    const incompleteDto = {
      name: "Test5",
      email: "test5@example.com"
    };

    // Act & Assert
    expect(() => CustomerMapper.toDomain(incompleteDto as any))
      .toThrow(new MandatoryFieldMissingException('id').message);
  });

  it('should throw an error if the name field is missing', () => {
    // Arrange
    const incompleteDto = {
      id: "5",
      email: "test5@example.com"
    };

    // Act & Assert
    expect(() => CustomerMapper.toDomain(incompleteDto as any))
      .toThrow(new MandatoryFieldMissingException('name').message);
  });
});
