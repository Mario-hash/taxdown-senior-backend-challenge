import { Customer } from '../../src/domain/entities/Customer';

describe('Customer Entity', () => {
  it('should create a customer with provided attributes', () => {
    const customer = new Customer('1', 'Test', 'test@example.com', 100);
    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Test');
    expect(customer.email).toBe('test@example.com');
    expect(customer.availableCredit).toBe(100);
  });

  it('should add credit to a customer', () => {
    const customer = new Customer('1', 'Test', 'test@example.com', 100);
    customer.addCredit(50);
    expect(customer.availableCredit).toBe(150);
  });
});