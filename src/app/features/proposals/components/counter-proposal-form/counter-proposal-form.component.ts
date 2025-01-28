import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    this.commentLabel = 'Comment (required)';
    this.isCommentRequired = true;
    this.validationButtonLabel = 'Send Counter-Proposal';
    super.ngOnInit();
  }

  protected override getProposalForm(): FormGroup {
    return this.fb.group(
      {
        paymentRatios: this.fb.array(this.ratioControls),
        comment: ['', Validators.required],
      }
    );
  }

  public override onSubmitProposal(): void {
    this.checkFormValidity();

    this.rejectedProposal.acceptanceRecord[this.activeOwnerId] = StatusEnum.REJECTED;
    this.rejectedProposal.status = StatusEnum.REJECTED;

    this.submitNewProposal();
  }

}
