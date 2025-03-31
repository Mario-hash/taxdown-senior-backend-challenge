import { CustomerDTO } from '../dto/CustomerDTO';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';
import { CustomerName } from '../../domain/vo/CustomerName';
import { CustomerEmail } from '../../domain/vo/CustomerEmail';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';

export class CustomerMapper {
  static toDomain(dto: CustomerDTO): Customer {
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
