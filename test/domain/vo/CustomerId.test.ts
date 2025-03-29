import { CustomerId } from '../../../src/domain/vo/CustomerId';

describe('CustomerId Value Object', () => {
  it('should create a valid CustomerId with a non-empty string', () => {
    // Arrange
    const validId = '1234';
    // Act
    const customerId = new CustomerId(validId);
    // Assert
    expect(customerId.getValue()).toBe(validId);
  });

  it('should throw an error for an empty string', () => {
    // Arrange
    const invalidId = '';
    // Act & Assert
    expect(() => new CustomerId(invalidId)).toThrow('Invalid CustomerId');
  });
});