import { Owner } from "../../owners/models/owner";

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  partyId: number;
  party: Owner;
}
