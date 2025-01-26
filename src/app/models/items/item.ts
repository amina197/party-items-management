export interface Item {
  readonly id: number;
  name: string;
  description: string;
  totalCost: number;
  ownerIds: number[];
}
