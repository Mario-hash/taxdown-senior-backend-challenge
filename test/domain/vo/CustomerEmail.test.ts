import { CustomerEmail } from '../../../src/domain/vo/CustomerEmail';
import { MalformedEmailException } from '../../../src/domain/exceptions/vo/customeremail/MalformedEmailException';
import { EmailAlreadyExistsException } from '../../../src/domain/exceptions/vo/customeremail/EmailAlreadyExistsException';


describe('Email Value Object', () => {
  it('should create a valid Email instance with a correct email string', () => {
    // Arrange
    const validEmail = 'test@example.com';
    
    // Act
    const emailObj = CustomerEmail.create(validEmail);
    
    // Assert
    expect(emailObj.getValue()).toBe(validEmail);
  });

  it('should throw an error for an empty email string', () => {
    // Arrange
    const emptyEmail = '';
    
    // Act & Assert
    expect(() => CustomerEmail.create(emptyEmail))
    .toThrow(new MalformedEmailException(emptyEmail).message);
  });

  describe('Email Value Object Exceptions', () => {
    it('should throw MalformedEmailException for an invalid email format', () => {
      // Arrange
      const invalidEmail = 'not-an-email';
      // Act & Assert
      expect(() => CustomerEmail.create(invalidEmail))
        .toThrow(new MalformedEmailException(invalidEmail).message);
    });
  });

  describe('EmailAlreadyExistsException', () => {
    it('should have the correct message and status code', () => {
      const email = 'duplicate@example.com';
      const error = new EmailAlreadyExistsException(email);
      expect(error.message).toBe(`The email '${email}' is already in use`);
      expect(error.statusCode).toBe(409);
      expect(error.name).toBe('EmailAlreadyExistsException');
    });
  });
});