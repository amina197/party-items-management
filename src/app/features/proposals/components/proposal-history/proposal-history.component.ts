import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, Input, input } from '@angular/core';
import { StatusToClassPipe } from '../../../../shared/pipes/status-to-class.pipe';
import { PartyItem } from '../../../items/models/party-item';
import { User } from '../../../users/users/user';

@Component({
  selector: 'app-proposal-history',
  imports: [NgClass, DatePipe, StatusToClassPipe],
  templateUrl: './proposal-history.component.html',
  styleUrl: './proposal-history.component.scss'
})
export class ProposalHistoryComponent {

  @Input({ required: true }) activeUser!: User;
  item = input.required<PartyItem>();
  proposals = computed(() => this.item().proposals);
  selectedProposal: any = null;

  showCreatorColumn!: boolean;
  showCreator!: boolean;

  public ngOnInit(): void {
    this.showCreatorColumn = this.proposals().some(p => p.createdByParty.id === this.activeUser.partyId);
  }
}
