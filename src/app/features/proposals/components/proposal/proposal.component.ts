import { Component, Input } from '@angular/core';
import { ItemService } from '../../../../services/items/item.service';
import { ItemStatusEnum } from '../../../items/models/item-status.enum';
import { PartyItem } from '../../../items/models/party-item';
import { User } from '../../../users/users/user';
import { ItemProposal } from '../../models/item-proposal/item-proposal';
import { ActionRequiredProposalComponent } from '../action-required-proposal/action-required-proposal.component';
import { CounterProposalFormComponent } from "../counter-proposal-form/counter-proposal-form.component";
import { NewProposalFormComponent } from "../new-proposal-form/new-proposal-form.component";
import { ProposalHistoryComponent } from "../proposal-history/proposal-history.component";
import { ProposalReadonlyComponent } from "../proposal-readonly/proposal-readonly.component";

@Component({
  selector: 'app-proposal',
  imports: [ActionRequiredProposalComponent, ProposalReadonlyComponent, NewProposalFormComponent, CounterProposalFormComponent, ProposalHistoryComponent],
  templateUrl: './proposal.component.html',
  styleUrl: './proposal.component.scss'
})
export class ProposalComponent {

  @Input({ required: true }) item!: PartyItem;
  @Input({ required: true }) ownerId!: number;
  @Input({ required: true }) activeUser!: User;

  displayCounterProposal = false;
  rejectedProposal!: ItemProposal;

  constructor(private itemService: ItemService) {}

  public onUpdateProposal(): void {
    this.itemService.updateItem(this.item);
    this.displayCounterProposal = false;
  }

  public onRejectProposal(proposal: ItemProposal) {
    this.rejectedProposal = proposal;
    this.displayCounterProposal = true;
  }

  protected readonly itemStatusEnum = ItemStatusEnum;

}
