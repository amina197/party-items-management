import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, Input, input } from '@angular/core';
import { StatusToClassPipe } from '../../../../shared/pipes/status-to-class.pipe';
import { PartyItem } from '../../../items/models/party-item';
import { User } from '../../../users/users/user';
import { ItemProposal } from '../../models/item-proposal/item-proposal';
import { ProposalReadonlyComponent } from "../proposal-readonly/proposal-readonly.component";

@Component({
  selector: 'app-proposal-history',
  imports: [NgClass, DatePipe, StatusToClassPipe, ProposalReadonlyComponent],
  templateUrl: './proposal-history.component.html',
  styleUrl: './proposal-history.component.scss'
})
export class ProposalHistoryComponent {

  @Input({ required: true }) activeUser!: User;
  item = input.required<PartyItem>();
  proposals = computed(() => this.item().proposals);
  selectedProposal: any = null;

  showCreatorColumn!: boolean;

  public ngOnInit(): void {
    this.showCreatorColumn = this.proposals().some(p => p.createdByParty.id === this.activeUser.partyId);
  }

  public selectProposal(proposal: ItemProposal): void {
    this.selectedProposal = proposal;
  }

  public closeProposal(): void {
    this.selectedProposal = null;
  }

}
