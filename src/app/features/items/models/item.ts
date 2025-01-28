import { Owner } from '../../owners/models/owner';
import { ItemProposal } from '../../proposals/models/item-proposal/item-proposal';
import { ItemStatusEnum } from './item-status.enum';

export interface Item {
  readonly id: number;
  name: string;
  description: string;
  totalCost: number;
  ownerIds: number[];
  owners: Owner[];
  status: ItemStatusEnum;
  proposals: ItemProposal[];
}
