import { Customer } from '../../../src/domain/entities/Customer';
import { Email } from '../../../src/domain/vo/Email';
import { CustomerId } from '../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../src/domain/vo/CustomerName';
import { AvailableCredit } from '../../../src/domain/vo/AvailableCredit';

describe('Customer Entity', () => {
  let tesId: CustomerId
  let testName: CustomerName
  let testCredit: AvailableCredit
  let testEmail: Email;

  beforeEach(() => {
    // Arrange
    tesId = new CustomerId('1');
    testName = new CustomerName('Test');
    testCredit = new AvailableCredit(100);
    testEmail = new Email('test@example.com');
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

  it('should add credit to a customer', () => {
    // Arrange
    const customer = new Customer(tesId, testName, testEmail, testCredit);

    // Act
    customer.addCredit(50);

    // Assert
    expect(customer.availableCredit.getValue()).toBe(150);
  });
});
