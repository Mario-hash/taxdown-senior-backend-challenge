import { Customer } from "../../../src/domain/entities/Customer";
import { CustomerService } from "../../../src/application/services/CustomerService";
import { ICustomerRepository } from "../../../src/domain/repository/ICustomerRepository";
import { Email } from "../../../src/domain/vo/Email";

describe('CustomerService addCredit initial test', () => {
  let customerRepository: jest.Mocked<ICustomerRepository>;
  let customerService: CustomerService;
  let testCustomer: Customer;

  beforeEach(() => {
    testCustomer = new Customer("1", "Test User", new Email('test@example.com'), 100);

    // Objeto simulado que cumple con ICustomerRepository
    customerRepository = {
      create: jest.fn().mockResolvedValue(testCustomer),
      update: jest.fn().mockImplementation(async (customer: Customer) => customer),
      delete: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn().mockResolvedValue(testCustomer),
      findAll: jest.fn().mockResolvedValue([testCustomer]),
    };

    customerService = new CustomerService(customerRepository);
  });

  it('should add credit to a customer', async () => {
    // Act
    const updatedCustomer = await customerService.addCredit("1", 50);
    
    // Assert
    expect(updatedCustomer.availableCredit).toBe(150);
    expect(customerRepository.findById).toHaveBeenCalledWith("1");
    expect(customerRepository.update).toHaveBeenCalledWith(expect.objectContaining({ availableCredit: 150 }));
  });

  it('should throw an error if customer is not found', async () => {
    // Act
    customerRepository.findById.mockResolvedValueOnce(null);
    
    // Assert
    await expect(customerService.addCredit("non-existent", 50))
      .rejects.toThrow("Customer with id non-existent not found");
  });

  it('createCustomer should create and return the customer', async () => {
    // Act
    const created = await customerService.createCustomer(testCustomer);
    
    // Assert
    expect(customerRepository.create).toHaveBeenCalledWith(testCustomer);
    expect(created).toEqual(testCustomer);
  });

  it('getCustomer should return the customer if it exists', async () => {
    // Act
    const result = await customerService.getCustomer("1");
    
    // Assert
    expect(customerRepository.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(testCustomer);
  });

  it('updateCustomer should update and return the customer', async () => {
    // Arrange
    testCustomer.name = "Updated Name";
    
    // Act
    const updated = await customerService.updateCustomer(testCustomer);
    
    // Assert
    expect(customerRepository.update).toHaveBeenCalledWith(testCustomer);
    expect(updated.name).toBe("Updated Name");
  });

  it('deleteCustomer should call repository.delete with the given id', async () => {
    // Act
    await customerService.deleteCustomer("1");
    
    // Assert
    expect(customerRepository.delete).toHaveBeenCalledWith("1");
  });

  it('listCustomersSortedByCredit should return customers sorted descending by availableCredit', async () => {
    // Arrange
    const customer2 = new Customer("2", "User Two", new Email("two@example.com"), 200);
    customerRepository.findAll.mockResolvedValueOnce([testCustomer, customer2]);
    
    // Act
    const sorted = await customerService.listCustomersSortedByCredit();
    
    // Assert
    expect(customerRepository.findAll).toHaveBeenCalled();
    expect(sorted[0].id).toBe("2");
    expect(sorted[1].id).toBe("1");
  });
});