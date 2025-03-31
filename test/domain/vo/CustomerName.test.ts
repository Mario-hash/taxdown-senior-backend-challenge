import { CustomerName } from '../../../src/domain/vo/CustomerName';

describe('CustomerName Value Object', () => {
  it('should create a valid CustomerName with a proper string', () => {
    // Arrange
    const validName = 'Test Name';
    // Act
    const customerName = CustomerName.create(validName);
    // Assert
    expect(customerName.getValue()).toBe(validName.trim());
  });

  it('should throw an error for an empty or whitespace-only string', () => {
    // Arrange
    const invalidName = '   ';
    // Act & Assert
    expect(() => CustomerName.create(invalidName)).toThrow('Invalid CustomerName');
  });

  it('should throw an error for a name that exceeds the maximum length', () => {
    // Arrange
    const longName = 'A'.repeat(51);
    // Act & Assert
    expect(() => CustomerName.create(longName)).toThrow('Invalid CustomerName');
  });

  it('should create a valid CustomerName if the length is exactly at the maximum allowed', () => {
    // Arrange
    const maxName = 'A'.repeat(50);
    // Act
    const customerName = CustomerName.create(maxName);
    // Assert
    expect(customerName.getValue()).toBe(maxName);
  });
});