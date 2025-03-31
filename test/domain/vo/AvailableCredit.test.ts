import { AvailableCredit } from '../../../src/domain/vo/AvailableCredit';

describe('AvailableCredit Value Object', () => {
  it('should create a valid AvailableCredit with a non-negative number', () => {
    // Arrange
    const creditValue = 100;
    // Act
    const availableCredit = AvailableCredit.create(creditValue);
    // Assert
    expect(availableCredit.getValue()).toBe(creditValue);
  });

  it('should throw an error for a negative credit value', () => {
    // Arrange
    const negativeCredit = -10;
    // Act & Assert
    expect(() => AvailableCredit.create(negativeCredit)).toThrow('AvailableCredit cannot be negative');
  });

  it('should add credit correctly', () => {
    // Arrange
    const initialCredit = AvailableCredit.create(100);
    // Act
    const newCredit = initialCredit.add(50);
    // Assert
    expect(newCredit.getValue()).toBe(150);
  });

  it('should throw an error if provided value is not a number', () => {
    // Arrange
    const invalidCredit: any = "abc";
    // Act & Assert
    expect(() => AvailableCredit.create(invalidCredit)).toThrow("AvailableCredit must be a number");
  });
});
