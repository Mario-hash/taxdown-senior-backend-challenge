import { CustomerPersistence } from '../dto/CustomerPersistence';
import { Customer } from '../../../domain/entities/Customer';
import { CustomerId } from '../../../domain/vo/CustomerId';
import { CustomerName } from '../../../domain/vo/CustomerName';
import { CustomerEmail } from '../../../domain/vo/CustomerEmail';
import { AvailableCredit } from '../../../domain/vo/AvailableCredit';

export class CustomerPersistenceMapper {
  static toPersistence(customer: Customer): CustomerPersistence & { _id: string } {
    return {
      _id: customer.id.getValue(),
      name: customer.name.getValue(),
      email: customer.email.getValue(),
      availableCredit: customer.availableCredit.getValue(),
    };
  }

  static toDomain(data: CustomerPersistence): Customer {
    return new Customer(
      CustomerId.create(data._id),
      CustomerName.create(data.name),
      CustomerEmail.create(data.email),
      AvailableCredit.create(data.availableCredit)
    );
  }
}
