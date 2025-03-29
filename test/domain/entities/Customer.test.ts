import { Customer } from '../../../src/domain/entities/Customer';
import { Email } from '../../../src/domain/vo/Email';

describe('Customer Entity', () => {
  let testEmail: Email;

  beforeEach(() => {
    testEmail = new Email('test@example.com');
  });

  it('should create a customer with provided attributes', () => {
    const customer = new Customer('1', 'Test', testEmail, 100);
    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Test');
    expect(customer.email).toBe(testEmail);
    expect(customer.availableCredit).toBe(100);
  });

  it('should add credit to a customer', () => {
    const customer = new Customer('1', 'Test', testEmail , 100);
    customer.addCredit(50);
    expect(customer.availableCredit).toBe(150);
  });
});