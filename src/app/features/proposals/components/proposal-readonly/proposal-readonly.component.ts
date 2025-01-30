import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProposalService } from '../../../../services/proposals/proposal.service';
import { StatusToClassPipe } from '../../../../shared/pipes/status-to-class.pipe';
import { PartyItem } from '../../../items/models/party-item';
import { ItemProposal } from '../../models/item-proposal/item-proposal';
import ColorUtils from '../../../../shared/utils/color.utils';

@Component({
  selector: 'app-proposal-readonly',
  imports: [NgClass, DatePipe, StatusToClassPipe],
  templateUrl: './proposal-readonly.component.html',
  styleUrl: './proposal-readonly.component.scss'
})
export class ProposalReadonlyComponent implements AfterViewInit {

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

  public ngAfterViewInit(): void {
    this.initChart();
  }

  private initChart(): void {
    const ctx = document.getElementById(`chart-${this.proposal.id}`) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.item.owners.map(owner => owner.name),
        datasets: [{
          data: this.item.owners.map(owner => this.proposal.paymentRatios[owner.id]),
          backgroundColor: ColorUtils.getChartColors()
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }
}
