import { CustomerId } from '../../../src/domain/vo/CustomerId';

describe('CustomerId Value Object', () => {
  it('should create a valid CustomerId with a non-empty string', () => {
    // Arrange
    const validId = '1234';
    // Act
    const customerId = CustomerId.create(validId);
    // Assert
    expect(customerId.getValue()).toBe(validId);
  });

  it('should throw an error for an empty string', () => {
    // Arrange
    const invalidId = '';
    // Act & Assert
    expect(() => CustomerId.create(invalidId)).toThrow('Invalid CustomerId');
  });
});
