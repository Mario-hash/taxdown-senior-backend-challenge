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
});