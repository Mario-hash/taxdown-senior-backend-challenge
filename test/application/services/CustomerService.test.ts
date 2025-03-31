import { Customer } from "../../../src/domain/entities/Customer";
import { CustomerService } from "../../../src/application/services/CustomerService";
import { ICustomerRepository } from "../../../src/domain/repository/ICustomerRepository";
import { Email } from "../../../src/domain/vo/Email";
import { CustomerId } from "../../../src/domain/vo/CustomerId";
import { CustomerName } from "../../../src/domain/vo/CustomerName";
import { AvailableCredit } from "../../../src/domain/vo/AvailableCredit";

describe('CustomerService addCredit initial test', () => {
  let customerRepository: jest.Mocked<ICustomerRepository>;
  let customerService: CustomerService;
  let testCustomer: Customer;

  let tesId: CustomerId
  let testName: CustomerName
  let testCredit: AvailableCredit
  let testEmail: Email;

  beforeEach(() => {
    tesId = new CustomerId('1');
    testName = new CustomerName('Test');
    testCredit = AvailableCredit.create(100);
    testEmail = new Email('test@example.com');
    testCustomer = new Customer(tesId, testName, testEmail, testCredit);

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
    const updatedCustomer = await customerService.addCredit(tesId, AvailableCredit.create(50));
    
    // Assert
    expect(updatedCustomer.availableCredit.getValue()).toBe(150);
    expect(customerRepository.findById).toHaveBeenCalledWith(tesId);
    expect(customerRepository.update).toHaveBeenCalledWith(updatedCustomer);
    expect(customerRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        availableCredit: expect.objectContaining({
          value: 150
        })
      })
    );
  });

  it('should throw an error if customer is not found', async () => {
    // Act
    customerRepository.findById.mockResolvedValueOnce(null);
    
    // Assert
    await expect(customerService.addCredit(tesId, testCredit))
      .rejects.toThrow("Customer with id " + tesId.getValue() + " not found");
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
    const result = await customerService.getCustomer(tesId);
    
    // Assert
    expect(customerRepository.findById).toHaveBeenCalledWith(tesId);
    expect(result).toEqual(testCustomer);
  });

  it('updateCustomer should update and return the customer', async () => {
    // Arrange
    testCustomer.name = new CustomerName("Updated Name");
    
    // Act
    const updated = await customerService.updateCustomer(testCustomer);
    
    // Assert
    expect(customerRepository.update).toHaveBeenCalledWith(testCustomer);
    expect(updated.name.getValue()).toBe("Updated Name");
  });

  it('deleteCustomer should call repository.delete with the given id', async () => {
    // Act
    await customerService.deleteCustomer(tesId);
    
    // Assert
    expect(customerRepository.delete).toHaveBeenCalledWith(tesId);
  });

  it('listCustomersSortedByCredit should return customers sorted descending by availableCredit', async () => {
    // Arrange
    const customer2 = new Customer(new CustomerId('2'), new CustomerName("User Two"), new Email("two@example.com"), AvailableCredit.create(200));
    customerRepository.findAll.mockResolvedValueOnce([testCustomer, customer2]);
    
    // Act
    const sorted = await customerService.listCustomersSortedByCredit();
    
    // Assert
    expect(customerRepository.findAll).toHaveBeenCalled();
    expect(sorted[0].id.getValue()).toBe("2");
    expect(sorted[1].id.getValue()).toBe("1");
  });
});