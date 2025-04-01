import { CustomerEmail } from '../../../src/domain/vo/CustomerEmail';
import { MalformedEmailException } from '../../../src/domain/exceptions/vo/customeremail/MalformedEmailException';

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
});