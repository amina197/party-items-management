
import { StatusEnum } from '../../../shared/enums/status.enum';
import { Owner } from '../../owners/models/owner';
import { ItemProposal } from '../../proposals/models/item-proposal/item-proposal';
import { Item } from './item';
import { ItemStatusEnum } from './item-status.enum';

export class PartyItem implements Item {
  id: number;
  name: string;
  description: string;
  totalCost: number;
  ownerIds: number[];
  owners: Owner[];
  status: ItemStatusEnum;
  proposals: ItemProposal[] = [];
  isShared: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    totalCost: number,
    ownerIds: number[],
    owners: Owner[],
    status: ItemStatusEnum,
    proposals: ItemProposal[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.totalCost = totalCost;
    this.ownerIds = ownerIds;
    this.owners = owners;
    this.isShared = this.isOwnedBySeveralParties();
    this.status = status || ItemStatusEnum.NO_ACTIVE_PROPOSAL;
    this.proposals = proposals;
  }

  private isOwnedBySeveralParties(): boolean {
    return this.owners.length > 1;
  }

  public isOwnedByParty(ownerId: number): boolean {
    return !!this.owners.find(owner => owner.id === ownerId);
  }

  public hasStatus(statuses: ItemStatusEnum[]): boolean {
    return statuses.includes(this.status);
  }

  public setStatusForParty(ownerId: number): void {
    this.status = this.getStatus(ownerId)
  }

  private getStatus(ownerId: number): ItemStatusEnum {
    if (!this.proposals.length) {
      return ItemStatusEnum.NO_ACTIVE_PROPOSAL;
    }

    const activeProposals = this.filterProposalsStatus(StatusEnum.PENDING);

    if (activeProposals.length) {
      const userActionRequired = activeProposals.some(proposal => proposal.acceptanceRecord[ownerId] === StatusEnum.PENDING);
      return userActionRequired ? ItemStatusEnum.ACTION_REQUIRED : ItemStatusEnum.WAITING_FOR_OTHERS;
    }

    const acceptedProposals = this.filterProposalsStatus(StatusEnum.ACCEPTED);
    if (acceptedProposals.length) {
      return ItemStatusEnum.ACCEPTED;
    }

    return ItemStatusEnum.NO_ACTIVE_PROPOSAL;
  }

  private filterProposalsStatus(status: StatusEnum): ItemProposal[] {
    return this.proposals.filter(proposal => proposal.status === status);
  }
}
