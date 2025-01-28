import { Component, OnInit } from '@angular/core';
import { ProposalFormComponent } from '../proposal-form/proposal-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-proposal-form',
  imports: [ReactiveFormsModule],
  templateUrl: '../proposal-form/proposal-form.component.html',
  styleUrl: '../proposal-form/proposal-form.component.scss'
})
export class NewProposalFormComponent extends ProposalFormComponent implements OnInit {

  public override ngOnInit(): void {
    this.commentLabel = 'Comment (optional)';
    this.isCommentRequired = false;
    this.validationButtonLabel = 'Send Proposal';
    super.ngOnInit();
  }

  protected override getProposalForm(): FormGroup {
    return this.fb.group(
      {
        paymentRatios: this.fb.array(this.ratioControls),
        comment: [''],
      }
    )
  }

  public override onSubmitProposal(): void {
    this.checkFormValidity();
    this.submitNewProposal();
  }

}
