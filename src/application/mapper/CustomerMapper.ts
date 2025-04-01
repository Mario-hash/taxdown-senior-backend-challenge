import { CustomerDTO } from '../dto/CustomerDTO';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';
import { CustomerName } from '../../domain/vo/CustomerName';
import { CustomerEmail } from '../../domain/vo/CustomerEmail';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';
import { MandatoryFieldMissingException } from '../../domain/exceptions/MandatoryFieldMissingException';

export class CustomerMapper {
  public static toDomain(dto: CustomerDTO): Customer {
    if (!dto.id) {
      throw new MandatoryFieldMissingException('id');
    }
    if (!dto.name) {
      throw new MandatoryFieldMissingException('name');
    }
    if (!dto.email) {
      throw new MandatoryFieldMissingException('email');
    }
    
    return new Customer(
      CustomerId.create(dto.id),
      CustomerName.create(dto.name),
      CustomerEmail.create(dto.email),
      AvailableCredit.create(dto.availableCredit ?? 0)
    );
  }

  static toDTO(entity: Customer): CustomerDTO {
    return {
      id: entity.id.getValue(),
      name: entity.name.getValue(),
      email: entity.email.getValue(),
      availableCredit: entity.availableCredit.getValue()
    };
  }
}
