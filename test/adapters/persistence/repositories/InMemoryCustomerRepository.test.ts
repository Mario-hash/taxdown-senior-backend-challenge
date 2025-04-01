import { InMemoryCustomerRepository } from '../../../../src/adapters/persistence/repositories/InMemoryCustomerRepository';
import { Customer } from '../../../../src/domain/entities/Customer';
import { AvailableCredit } from '../../../../src/domain/vo/AvailableCredit';
import { CustomerId } from '../../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../../src/domain/vo/CustomerName';
import { CustomerEmail } from '../../../../src/domain/vo/CustomerEmail';

describe('MemoryCustomerRepository', () => {
  let repo: InMemoryCustomerRepository;
  let testCustomer: Customer;

  let tesId: CustomerId
  let testName: CustomerName
  let testCredit: AvailableCredit
  let testEmail: CustomerEmail;

  beforeEach(() => {
    repo = new InMemoryCustomerRepository();
    tesId = CustomerId.create('1');
    testName = CustomerName.create('Test');
    testCredit = AvailableCredit.create(100);
    testEmail = CustomerEmail.create('test@example.com');
    testCustomer = new Customer(tesId, testName, testEmail, testCredit);
  });

  it('should create and find a customer by id', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    const customer = await repo.findById(tesId);
    //Assert
    expect(customer).not.toBeNull();
    expect(customer?.id).toBe(tesId);
  });

  it('should update a customer', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    testCustomer.availableCredit = AvailableCredit.create(150);
    await repo.update(testCustomer);
    const customer = await repo.findById(tesId);
    //Assert
    expect(customer?.availableCredit.getValue()).toBe(150);
  });

  it('should delete a customer', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    await repo.delete(tesId);
    const customer = await repo.findById(tesId);
    //Assert
    expect(customer).toBeNull();
  });

  it('should return all customers', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    const customers = await repo.findAll();
    //Assert
    expect(customers.length).toBe(1);
  });

  it('should return customer by email', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    const customer = await repo.findByEmail(testEmail);
    //Assert
    expect(customer).not.toBeNull();
    expect(customer?.email).toBe(testEmail);
  });
});