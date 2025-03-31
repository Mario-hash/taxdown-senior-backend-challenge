import { CustomerDTO } from '../dto/CustomerDTO';
import { Customer } from '../../domain/entities/Customer';
import { CustomerId } from '../../domain/vo/CustomerId';
import { CustomerName } from '../../domain/vo/CustomerName';
import { Email } from '../../domain/vo/Email';
import { AvailableCredit } from '../../domain/vo/AvailableCredit';

export class CustomerMapper {
  static toDomain(dto: CustomerDTO): Customer {
    return new Customer(
      new CustomerId(dto.id),
      new CustomerName(dto.name),
      new Email(dto.email),
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
