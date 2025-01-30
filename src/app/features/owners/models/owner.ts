export class Owner {
  readonly initialBudget = 100000;

  id: number;
  name: string;
  remainingBudget: number;

  constructor(id: number, name: string, remainingBudget?: number) {
    this.id = id;
    this.name = name;
    this.remainingBudget = remainingBudget || this.initialBudget;
  }
}
