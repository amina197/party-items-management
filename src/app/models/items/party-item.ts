import { StatusEnum } from '../../shared/enums/status.enum';
import { Item } from './item';

export class PartyItem implements Item {
  id: number;
  name: string;
  description: string;
  totalCost: number;
  ownerIds: number[];
  status: StatusEnum;

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
    this.status = this.determineInitialStatus();
  }

  private determineInitialStatus(): StatusEnum {
    return this.ownerIds.length === 1 ? StatusEnum.OWNED : StatusEnum.PENDING;
  }

  public isOwnedByPartyWithStatus(partyId: number, statuses: StatusEnum[]): boolean {
    return this.isOwnedByParty(partyId) && this.isWithStatus(statuses);
  }

  private isOwnedByParty(partyId: number): boolean {
    return this.ownerIds.includes(partyId);
  }

  private isWithStatus(statuses: StatusEnum[]): boolean {
    return statuses.includes(this.status);
  }
}
