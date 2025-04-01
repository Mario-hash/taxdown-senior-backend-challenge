import { Customer } from '../../../src/domain/entities/Customer';
import { CustomerEmail } from '../../../src/domain/vo/CustomerEmail';
import { CustomerId } from '../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../src/domain/vo/CustomerName';
import { AvailableCredit } from '../../../src/domain/vo/AvailableCredit';

describe('Customer Entity', () => {
  let tesId: CustomerId
  let testName: CustomerName
  let testCredit: AvailableCredit
  let testEmail: CustomerEmail;

  beforeEach(() => {
    // Arrange
    tesId = CustomerId.create('1');
    testName = CustomerName.create('Test');
    testCredit = AvailableCredit.create(100);
    testEmail = CustomerEmail.create('test@example.com');
  });

  it('should create a customer with provided attributes', () => {
    // Act
    const customer = new Customer(tesId, testName, testEmail, testCredit);

    // Assert
    expect(customer.id.getValue()).toBe('1');
    expect(customer.name.getValue()).toBe('Test');
    expect(customer.email.getValue()).toBe('test@example.com');
    expect(customer.availableCredit.getValue()).toBe(100);
  });

  it('should create a customer without availableCredit', () => {
    // Act
    const customer = new Customer(tesId, testName, testEmail);

    // Assert
    expect(customer.id.getValue()).toBe('1');
    expect(customer.name.getValue()).toBe('Test');
    expect(customer.email.getValue()).toBe('test@example.com');
    expect(customer.availableCredit.getValue()).toBe(0);
  });

  it('should add credit to a customer', () => {
    // Arrange
    const customer = new Customer(tesId, testName, testEmail, testCredit);

    // Act
    customer.addCredit(AvailableCredit.create(50));

    // Assert
    expect(customer.availableCredit.getValue()).toBe(150);
  });
});
