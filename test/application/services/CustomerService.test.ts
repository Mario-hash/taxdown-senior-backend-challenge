import { Customer } from "../../../src/domain/entities/Customer";
import { CustomerService } from "../../../src/application/services/CustomerService";
import { CustomerRepository } from "../../../src/domain/ports/CustomerRepository";
import { CustomerEmail } from "../../../src/domain/vo/CustomerEmail";
import { CustomerId } from "../../../src/domain/vo/CustomerId";
import { CustomerName } from "../../../src/domain/vo/CustomerName";
import { AvailableCredit } from "../../../src/domain/vo/AvailableCredit";
import { DuplicateCustomerIdException } from "../../../src/domain/exceptions/DuplicateCustomerIdException";
import { EmailAlreadyExistsException } from "../../../src/domain/exceptions/EmailAlreadyExistsException";
import { NotFoundError } from "../../../src/domain/exceptions/NotFoundError";
import { Either } from "../../../src/shared/Either";
import { CustomerDTO } from "../../../src/application/dto/CustomerDTO";
import { MalformedEmailException } from "../../../src/domain/exceptions/vo/customeremail/MalformedEmailException";

describe('CustomerService addCredit initial test', () => {
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customerService: CustomerService;
  let testCustomer: Customer;

  let tesId: CustomerId
  let testName: CustomerName
  let testCredit: AvailableCredit
  let testEmail: CustomerEmail;

  beforeEach(() => {
    tesId = CustomerId.create('1');
    testName = CustomerName.create('Test');
    testCredit = AvailableCredit.create(100);
    testEmail = CustomerEmail.create('test@example.com');
    testCustomer = new Customer(tesId, testName, testEmail, testCredit);

    // Objeto simulado que cumple con ICustomerRepository
    customerRepository = {
      create: jest.fn().mockResolvedValue(testCustomer),
      update: jest.fn().mockImplementation(async (customer: Customer) => customer),
      delete: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn().mockResolvedValue(testCustomer),
      findAll: jest.fn().mockResolvedValue([testCustomer]),
      findByEmail: jest.fn().mockResolvedValue(testCustomer),
    };

    customerService = new CustomerService(customerRepository);
  });

  it('should add credit to a customer', async () => {
    // Act
    const result = await customerService.addCredit(tesId, AvailableCredit.create(50));
    
    // Assert
    expect(Either.right(result));
    result.fold(
      error => fail("Expected a valid customer, but got error: " + error.message),
      updatedCustomer => {
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
      }
    );
  });

  it('should throw an error if customer is not found', async () => {
  // Arrange
  customerRepository.findById.mockResolvedValueOnce(null);
  
  // Act
  const result = await customerService.addCredit(tesId, testCredit);
  
  // Assert
  expect(Either.left(result));
  result.fold(
    error => expect(error.message).toBe("Customer with id " + tesId.getValue() + " not found"),
    _ => fail("Expected a Left with NotFoundError, but got Right")
    );
  });

  it('createCustomer should create and return the customer', async () => {
    //Arrange
    customerRepository.findById.mockResolvedValueOnce(null);
    customerRepository.findByEmail.mockResolvedValueOnce(null);
    
    // Act
    const result = await customerService.createCustomer(testCustomer);
    
    // Assert
    expect(Either.right(result));
    result.fold(
      error => { throw new Error("Unexpected Left: " + error.message); },
      created => {
        expect(customerRepository.create).toHaveBeenCalledWith(testCustomer);
        expect(created).toEqual(testCustomer);
      }
    );
  });

  it('createCustomer should throw an error if customerId is duplicate', async () => {
    //Arrange
    customerRepository.findByEmail.mockResolvedValueOnce(null);
    
    // Act
    const result = await customerService.createCustomer(testCustomer);

    // Assert
    expect(Either.left(result));
    result.fold(
      error => {
        expect(error).toBeInstanceOf(DuplicateCustomerIdException);
        expect(error.message).toBe(`Customer with id ${tesId.getValue()} already exists`);
      },
      _ => { throw new Error("Expected Left with DuplicateCustomerIdException, but got Right"); }
    );
  });

  it('createCustomer should throw an error if customerEmail is duplicate', async () => {
    //Arrange
    customerRepository.findById.mockResolvedValueOnce(null);
    
 // Act
    const result = await customerService.createCustomer(testCustomer);

    // Assert
    expect(Either.left(result));
    result.fold(
      error => {
        expect(error).toBeInstanceOf(EmailAlreadyExistsException);
        expect(error.message).toBe(`The email '${testEmail.getValue()}' is already in use`);
      },
      _ => { throw new Error("Expected Left with EmailAlreadyExistsException, but got Right"); }
    );
  });

  it('getCustomer should return the customer if it exists', async () => {
    // Act
    const result = await customerService.getCustomer(tesId);
    
    // Assert
    expect(Either.right(result));
    result.fold(
      error => { throw new Error("Unexpected Left: " + error.message); },
      customer => expect(customer).toEqual(testCustomer)
    );
  });

  it('getCustomer should throw an error if customerId not found', async () => {
    // Act
    customerRepository.findById.mockResolvedValueOnce(null);
    
    // Act
    const result = await customerService.getCustomer(tesId);
    
    // Assert
    expect(Either.left(result));
    result.fold(
      error => expect(error.message).toBe(`Customer with id ${tesId.getValue()} not found`),
      _ => { throw new Error("Expected Left but got Right"); }
    );
  });
  

  it('updateCustomer should update and return the customer', async () => {
    // Arrange
    customerRepository.findByEmail.mockResolvedValueOnce(null);
    
    const partialUpdate: Partial<CustomerDTO> = {
      name: "Updated Name",
      email: "new@example.com",
      availableCredit: 200
    };
    // Act
    const result = await customerService.updateCustomer(testCustomer.id.getValue(), partialUpdate);


    // Assert
    expect(Either.right(result));
    result.fold(
      error => { throw new Error("Expected Right but got Left: " + error.message); },
      updatedCustomer => {
        expect(updatedCustomer.name.getValue()).toBe("Updated Name");
        expect(updatedCustomer.email.getValue()).toBe("new@example.com");
        expect(updatedCustomer.availableCredit.getValue()).toBe(200);
      }
    );
  });

  it('updateCustomer should preserve existing name if name is not provided', async () => {
    // Arrange
    customerRepository.findByEmail.mockResolvedValueOnce(null);
  
    const partialUpdate: Partial<CustomerDTO> = {
      email: "new@example.com",
      availableCredit: 150
    };
  
    // Act
    const result = await customerService.updateCustomer(testCustomer.id.getValue(), partialUpdate);
  
    // Assert
    expect(Either.right(result));
    result.fold(
      error => { throw new Error("Expected Right but got Left: " + error.message); },
      updatedCustomer => {
        expect(updatedCustomer.name.getValue()).toBe(testCustomer.name.getValue());
        expect(updatedCustomer.email.getValue()).toBe("new@example.com");
        expect(updatedCustomer.availableCredit.getValue()).toBe(150);
      }
    );
  });

  it('should return Left with NotFoundError when updateCustomer is called for a non-existent customer', async () => {
    // Arrange
    customerRepository.findById.mockResolvedValueOnce(null);
    
    // Act
    const result = await customerService.updateCustomer(testCustomer.id.getValue(), { name: "Whatever" });

    // Assert: Se espera Left con NotFoundError
    expect(Either.left(result));
    result.fold(
      error => expect(error.message).toBe(`Customer with id ${testCustomer.id.getValue()} not found`),
      _ => { throw new Error("Expected Left but got Right"); }
    );
  });

  it('updateCustomer should return error if new email already exists', async () => {
    // Arrange
    const anotherCustomer = new Customer(
      CustomerId.create('2'),
      CustomerName.create("User Two"),
      CustomerEmail.create("new@example.com"),
      AvailableCredit.create(100)
    );
  
    customerRepository.findById.mockResolvedValueOnce(testCustomer);
    customerRepository.findByEmail.mockResolvedValueOnce(anotherCustomer);
  
    const updateData = {
      name: "UpdatedName",
      email: "new@example.com"
    };
  
    // Act
    const result = await customerService.updateCustomer(testCustomer.id.getValue(), updateData);
  
    // Assert
    expect(Either.left(result));
    result.fold(
      error => expect(error).toBeInstanceOf(EmailAlreadyExistsException),
      _ => fail("Expected an EmailAlreadyExistsException but got Right")
    );
  });

  it('should throw MalformedEmailException when email format is invalid', async () => {
    // Arrange
    customerRepository.findById.mockResolvedValueOnce(testCustomer);
  
    const updateData = {
      email: "malformedEmail.com"
    };
  
    // Act & Assert
    await expect(customerService.updateCustomer(testCustomer.id.getValue(), updateData))
      .rejects
      .toThrow(MalformedEmailException);
  });

  it('deleteCustomer should return right when deletion succeeds', async () => {
    // Act
    const result = await customerService.deleteCustomer(tesId);
  
    // Assert
    expect(customerRepository.delete).toHaveBeenCalledWith(tesId);
    expect(Either.right(result));
    result.fold(
      _ => fail('Expected Right but got Left'),
      success => expect(success).toBeUndefined()
    );
  });

  it('should return customers sorted ascending by availableCredit when order is asc', async () => {
    const customer1 = new Customer(CustomerId.create('1'), CustomerName.create("User 1"), CustomerEmail.create("a@example.com"), AvailableCredit.create(100));
    const customer2 = new Customer(CustomerId.create('2'), CustomerName.create("User 2"), CustomerEmail.create("b@example.com"), AvailableCredit.create(200));
    customerRepository.findAll.mockResolvedValueOnce([customer2, customer1]);
  
    const result = await customerService.listCustomersSortedByCredit('asc');
  
    result.fold(
      () => fail("Expected Right but got Left"),
      sorted => {
        expect(sorted[0].id.getValue()).toBe('1');
        expect(sorted[1].id.getValue()).toBe('2');
      }
    );
  });
  
  it('should return customers sorted descending by availableCredit when order is desc', async () => {
    const customer1 = new Customer(CustomerId.create('1'), CustomerName.create("User 1"), CustomerEmail.create("a@example.com"), AvailableCredit.create(100));
    const customer2 = new Customer(CustomerId.create('2'), CustomerName.create("User 2"), CustomerEmail.create("b@example.com"), AvailableCredit.create(200));
    customerRepository.findAll.mockResolvedValueOnce([customer1, customer2]);
  
    const result = await customerService.listCustomersSortedByCredit('desc');
  
    result.fold(
      () => fail("Expected Right but got Left"),
      sorted => {
        expect(sorted[0].id.getValue()).toBe('2');
        expect(sorted[1].id.getValue()).toBe('1');
      }
    );
  });
});