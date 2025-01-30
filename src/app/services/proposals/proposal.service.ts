import { Injectable } from '@angular/core';
import { StatusEnum } from '../../shared/enums/status.enum';
import { ItemProposal } from '../../features/proposals/models/item-proposal/item-proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  public getActiveProposal(proposals: ItemProposal[]): ItemProposal | null  {
    const activeProposal = proposals.find(proposal => proposal.status === StatusEnum.PENDING);
    if (activeProposal) {
      return activeProposal;
    }

    return null;
  }

  public isProposalAccepted(proposal: ItemProposal): boolean {
    return Object.values(proposal.acceptanceRecord).every(
      val => val === StatusEnum.ACCEPTED
    );
  }
}
