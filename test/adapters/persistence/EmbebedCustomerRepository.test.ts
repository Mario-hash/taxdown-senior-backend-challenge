import { EmbebedCustomerRepository } from '../../../src/adapters/persistence/EmbebedCustomerRepositoryImpl';
import { Customer } from '../../../src/domain/entities/Customer';

describe('MemoryCustomerRepository', () => {
  let repo: EmbebedCustomerRepository;
  let testCustomer: Customer;

  beforeEach(() => {
    repo = new EmbebedCustomerRepository();
    testCustomer = new Customer("1", "Test User", "test@example.com", 100);
  });

  it('should create and find a customer by id', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    const customer = await repo.findById("1");
    //Assert
    expect(customer).not.toBeNull();
    expect(customer?.id).toBe("1");
  });

  it('should update a customer', async () => {
    // Arrange
    await repo.create(testCustomer);
    //Act
    testCustomer.availableCredit = 150;
    await repo.update(testCustomer);
    const customer = await repo.findById("1");
    //Assert
    expect(customer?.availableCredit).toBe(150);
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