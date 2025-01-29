import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProposalFormComponent } from '../proposal-form/proposal-form.component';

@Component({
  selector: 'app-new-proposal-form',
  imports: [ReactiveFormsModule],
  templateUrl: '../proposal-form/proposal-form.component.html',
  styleUrl: '../proposal-form/proposal-form.component.scss'
})
export class NewProposalFormComponent extends ProposalFormComponent implements OnInit {

  public override ngOnInit(): void {
    this.formTitle = 'Create a new Proposal';
    this.commentLabel = 'Comment (optional)';
    this.isCommentRequired = false;
    this.validationButtonLabel = 'Send Proposal';
    super.ngOnInit();
  }

  public override onSubmitProposal(): void {
    this.checkFormValidity();
    this.submitNewProposal();
  }

}
