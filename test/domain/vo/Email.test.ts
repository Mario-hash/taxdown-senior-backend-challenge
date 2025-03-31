import { CustomerEmail } from '../../../src/domain/vo/CustomerEmail';

describe('Email Value Object', () => {
  it('should create a valid Email instance with a correct email string', () => {
    // Arrange
    const validEmail = 'test@example.com';
    
    // Act
    const emailObj = CustomerEmail.create(validEmail);
    
    // Assert
    expect(emailObj.getValue()).toBe(validEmail);
  });

  it('should throw an error for an invalid email format', () => {
    // Arrange
    const invalidEmail = 'invalid-email';
    
    // Act & Assert
    expect(() => CustomerEmail.create(invalidEmail)).toThrow('Invalid email format');
  });

  it('should throw an error for an empty email string', () => {
    // Arrange
    const emptyEmail = '';
    
    // Act & Assert
    expect(() => CustomerEmail.create(emptyEmail)).toThrow('Invalid email format');
  });
});