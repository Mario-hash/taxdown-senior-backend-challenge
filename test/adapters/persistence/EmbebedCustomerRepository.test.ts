import { EmbebedCustomerRepository } from '../../../src/adapters/persistence/EmbebedCustomerRepositoryImpl';
import { Customer } from '../../../src/domain/entities/Customer';
import { AvailableCredit } from '../../../src/domain/vo/AvailableCredit';
import { CustomerId } from '../../../src/domain/vo/CustomerId';
import { CustomerName } from '../../../src/domain/vo/CustomerName';
import { Email } from '../../../src/domain/vo/Email';

describe('MemoryCustomerRepository', () => {
  let repo: EmbebedCustomerRepository;
  let testCustomer: Customer;

  let tesId: CustomerId
  let testName: CustomerName
  let testCredit: AvailableCredit
  let testEmail: Email;

  beforeEach(() => {
    repo = new EmbebedCustomerRepository();
    tesId = new CustomerId('1');
    testName = new CustomerName('Test');
    testCredit = new AvailableCredit(100);
    testEmail = new Email('test@example.com');
    testCustomer = new Customer(tesId, testName, testEmail, testCredit);
  });

  it('should create and find a customer by id', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    const customer = await repo.findById("1");
    //Assert
    expect(customer).not.toBeNull();
    expect(customer?.id).toBe(tesId);
  });

  it('should update a customer', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    testCustomer.availableCredit = new AvailableCredit(150);
    await repo.update(testCustomer);
    const customer = await repo.findById("1");
    //Assert
    expect(customer?.availableCredit.getValue()).toBe(150);
  });

  it('should delete a customer', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    await repo.delete("1");
    const customer = await repo.findById("1");
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
});