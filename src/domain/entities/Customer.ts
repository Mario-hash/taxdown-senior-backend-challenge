import { Email } from "../vo/Email";

export class Customer {
    constructor(
      public id: string,
      public name: string,
      public email: Email,
      public availableCredit: number = 0
    ) {}

    addCredit(amount: number): void {
        this.availableCredit += amount;
    }
  }