import { Component, Input, OnInit } from '@angular/core';
import { ProposalService } from '../../../../services/proposals/proposal.service';
import { PartyItem } from '../../../items/models/party-item';
import { ItemProposal } from '../../models/item-proposal/item-proposal';

@Component({
  selector: 'app-proposal-readonly',
  imports: [],
  templateUrl: './proposal-readonly.component.html',
  styleUrl: './proposal-readonly.component.scss'
})
export class ProposalReadonlyComponent implements OnInit {

  @Input() proposal!: ItemProposal;
  @Input({ required: true }) item!: PartyItem;

  constructor(private proposalService: ProposalService) {}

  public ngOnInit(): void {
    if (!this.proposal) {
      const activeProposal = this.proposalService.getActiveProposal(this.item.proposals);
      if (activeProposal) {
        this.proposal = activeProposal;
      }
    }
  }
}
