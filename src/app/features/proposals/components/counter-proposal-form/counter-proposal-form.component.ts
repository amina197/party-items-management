import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { ItemProposal } from '../../models/item-proposal/item-proposal';
import { ProposalFormComponent } from '../proposal-form/proposal-form.component';

@Component({
  selector: 'app-counter-proposal-form',
  imports: [ReactiveFormsModule],
  templateUrl: '../proposal-form/proposal-form.component.html',
  styleUrl: '../proposal-form/proposal-form.component.scss'
})
export class CounterProposalFormComponent extends ProposalFormComponent implements OnInit{

  @Input({required: true}) rejectedProposal!: ItemProposal;

  public override ngOnInit(): void {
    this.formTitle = 'Send a Counter-Proposal';
    this.commentLabel = 'Comment (required)';
    this.isCommentRequired = true;
    this.validationButtonLabel = 'Send Counter-Proposal';
    super.ngOnInit();
  }

  public override onSubmitProposal(): void {
    this.checkFormValidity();

    this.rejectedProposal.acceptanceRecord[this.activeUser.partyId] = StatusEnum.REJECTED;
    this.rejectedProposal.status = StatusEnum.REJECTED;

    this.submitNewProposal();
  }

}
