import { Item } from './item';

export class PartyItem implements Item {
  id: number;
  name: string;
  description: string;
  totalCost: number;
  ownerIds: number[];

  constructor(
    id: number,
    name: string,
    description: string,
    totalCost: number,
    ownerIds: number[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.totalCost = totalCost;
    this.ownerIds = ownerIds;
  }

  isOwnedByParty(partyId: number): boolean {
    return this.ownerIds.includes(partyId);
  }
}
