import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProposalService } from '../../../../services/proposals/proposal.service';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { ItemStatusEnum } from '../../../items/models/item-status.enum';
import { PartyItem } from '../../../items/models/party-item';
import { User } from '../../../users/users/user';
import { ItemProposal } from '../../models/item-proposal/item-proposal';
import { ProposalReadonlyComponent } from '../proposal-readonly/proposal-readonly.component';

@Component({
  selector: 'app-action-required-proposal',
  imports: [ProposalReadonlyComponent],
  templateUrl: './action-required-proposal.component.html',
  styleUrl: './action-required-proposal.component.scss'
})
export class ActionRequiredProposalComponent implements OnInit {


  @Input({ required: true }) item!: PartyItem;
  @Input({ required: true }) ownerId!: number;
  @Input({ required: true }) activeUser!: User;

  @Output() accepted = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<ItemProposal>();

  proposal!: ItemProposal;

  constructor(private proposalService: ProposalService) {}

  public ngOnInit(): void {
    const activeProposal = this.proposalService.getActiveProposal(this.item.proposals);
    if (activeProposal) {
      this.proposal = activeProposal;
    }
  }

  public onAcceptClick(): void {
    this.proposal.acceptanceRecord[this.ownerId] = StatusEnum.ACCEPTED;

    const allAccepted = Object.values(this.proposal.acceptanceRecord).every(
      val => val === StatusEnum.ACCEPTED
    );
    if (allAccepted) {
      this.proposal.status = StatusEnum.ACCEPTED;
      this.item.status = ItemStatusEnum.ACCEPTED;
    }

    const proposalIndex = this.item.proposals.findIndex(p => p.id === this.proposal.id);
    this.item.proposals[proposalIndex] = this.proposal;

    this.accepted.emit();
  }

  public onRejectClick(): void {
    this.rejected.emit(this.proposal);
  }

  protected readonly statusEnum = StatusEnum;
}
