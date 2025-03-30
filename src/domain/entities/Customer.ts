import { AvailableCredit } from "../vo/AvailableCredit";
import { CustomerId } from "../vo/CustomerId";
import { CustomerName } from "../vo/CustomerName";
import { Email } from "../vo/Email";

export class Customer {
  public id: CustomerId;
  public name: CustomerName;
  public email: Email;
  public availableCredit: AvailableCredit;

  constructor(
    id: CustomerId,
    name: CustomerName,
    email: Email,
    availableCredit?: AvailableCredit
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.availableCredit = availableCredit ?? new AvailableCredit(0);
  }

  addCredit(amount: AvailableCredit): void {
    this.availableCredit = this.availableCredit.add(amount.getValue());
  }
}
