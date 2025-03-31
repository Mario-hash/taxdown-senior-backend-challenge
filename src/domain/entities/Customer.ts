import { AvailableCredit } from "../vo/AvailableCredit";
import { CustomerId } from "../vo/CustomerId";
import { CustomerName } from "../vo/CustomerName";
import { CustomerEmail } from "../vo/CustomerEmail";

export class Customer {
  public id: CustomerId;
  public name: CustomerName;
  public email: CustomerEmail;
  public availableCredit: AvailableCredit;

  constructor(
    id: CustomerId,
    name: CustomerName,
    email: CustomerEmail,
    availableCredit?: AvailableCredit
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.availableCredit = availableCredit ?? AvailableCredit.create(0);
  }

  addCredit(amount: AvailableCredit): void {
    this.availableCredit = this.availableCredit.add(amount.getValue());
  }
}
