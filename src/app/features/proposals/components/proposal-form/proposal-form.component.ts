import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
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
  @Input({ required: true }) activeUser!: User;

  @Output() submitted = new EventEmitter<void>();

  proposalForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  ratioControls: FormControl[] = [];
  formTitle!: string;
  commentLabel!: string;
  isCommentRequired!: boolean;
  commentValidators!: [];
  validationButtonLabel!: string;
  chart!: Chart;

  constructor(protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initChart();
  }

  private getProposalForm(): FormGroup {
    const commentValidators = this.isCommentRequired ? Validators.required : null;
    return this.fb.group(
      {
        paymentRatios: this.fb.array(this.ratioControls, [
          this.totalRatiosValidator(),
          this.budgetValidator()
        ]),
        comment: ['', commentValidators],
      }
    );
  }

  private totalRatiosValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const total = control.value.reduce((sum: number, val: number) => sum + val, 0);
      return total === 100 ? null : { totalInvalid: true };
    };
  }

  private budgetValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ratio = control.value[this.activeUser.partyId] || 100;
      const totalCost = this.item.totalCost;
      const totalAllocation = totalCost * (ratio / 100);
      return totalAllocation <= this.activeUser.party.remainingBudget ? null : { budgetExceeded: true };
    };
  }

  private initForm(): void {
    this.ratioControls = this.getRatioControls();
    this.proposalForm = this.getProposalForm();
  }

  private getRatioControls(): FormControl[] {
    return this.item.owners.map(() => {
      const ratioValidators = [Validators.required, Validators.min(0), Validators.max(100)];
      return this.fb.control(0, ratioValidators);
    });
  }

  get paymentRatios(): FormArray<FormControl<number>> {
    return this.proposalForm.get('paymentRatios') as FormArray<FormControl<number>>;
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
      this.activeUser.party,
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
      acceptanceRecord[owner.id] = owner.id === this.activeUser.partyId ? StatusEnum.ACCEPTED : StatusEnum.PENDING;
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


  public updateChart(): void {
    this.chart.data.datasets[0].data = this.paymentRatios.value;
    this.chart.update();
  }

  private initChart(): void {
    const ctx = document.getElementById('ratiosChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.item.owners.map(owner => owner.name),
        datasets: [
          { data: this.paymentRatios.value, backgroundColor: '#2196f3' }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  public onCancelProposal(): void {
    this.proposalForm.reset();
  }
}
