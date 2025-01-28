import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { PartyItem } from '../../../items/models/party-item';
import { Owner } from '../../../owners/models/owner';
import { User } from '../../../users/users/user';
import { AcceptanceRecord } from '../../models/acceptance-record';
import { ItemProposal } from '../../models/item-proposal/item-proposal';
import { PaymentRatio } from '../../models/payment-ratio';

@Component({
  selector: 'app-proposal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './proposal-form.component.html',
  styleUrl: './proposal-form.component.scss'
})
export abstract class ProposalFormComponent implements OnInit {

  @Input({ required: true }) item!: PartyItem;
  @Input({ required: true }) activeOwnerId!: number;
  @Input({ required: true }) activeUser!: User;

  @Output() submitted = new EventEmitter<void>();

  proposalForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  ratioControls: FormControl[] = [];
  commentLabel!: string;
  isCommentRequired!: boolean;
  validationButtonLabel!: string;

  constructor(protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.ratioControls = this.getRatioControls();
    this.proposalForm = this.getProposalForm();
  }

  private getRatioControls(): FormControl[] {
    return this.item.owners.map(() => {
      const ratioValidators = [Validators.required, Validators.min(0), Validators.max(100)];
      return this.fb.control(null, ratioValidators);
    });
  }

  protected abstract getProposalForm(): FormGroup;

  get paymentRatios(): FormArray<FormControl<number | null>> {
    return this.proposalForm.get('paymentRatios') as FormArray<FormControl<number | null>>;
  }

  public abstract onSubmitProposal(): void;

  protected checkFormValidity(): void {
    if (this.proposalForm.invalid) {
      this.proposalForm.markAllAsTouched();
      return;
    }
  }

  protected submitNewProposal(): void {
    this.isSubmitting.set(true);

    const newProposal = this.buildNewProposal();
    this.item.proposals.unshift(newProposal);

    this.submitted.next();
    this.isSubmitting.set(false);
  }

  private buildNewProposal(): ItemProposal {
    return new ItemProposal(
      this.item.id,
      new Date(),
      this.activeOwnerId,
      this.activeUser,
      this.getRatioMap(),
      StatusEnum.PENDING,
      this.getAcceptanceRecord(),
      this.proposalForm.get('comment')?.value
    );
  }

  private getAcceptanceRecord(): AcceptanceRecord {
    const acceptanceRecord: AcceptanceRecord = {};

    this.item.owners.forEach(owner => {
      acceptanceRecord[owner.id] = owner.id === this.activeOwnerId ? StatusEnum.ACCEPTED : StatusEnum.PENDING;
    });

    return acceptanceRecord;
  }

  private getRatioMap(): PaymentRatio {
    const ratioMap: PaymentRatio = {};

    this.item.owners.forEach((owner: Owner, index: number) => {
      const ratio = this.paymentRatios.at(index).value;
      if (ratio) {
        ratioMap[owner.id] = ratio;
      }
    });

    return ratioMap;
  }

  public onCancelProposal(): void {
    this.proposalForm.reset();
  }
}
