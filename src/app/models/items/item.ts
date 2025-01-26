import { StatusEnum } from '../../shared/enums/status.enum';

export interface Item {
  readonly id: number;
  name: string;
  description: string;
  totalCost: number;
  ownerIds: number[];
  status: StatusEnum;
}
