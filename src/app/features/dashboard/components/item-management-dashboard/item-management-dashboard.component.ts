import { Component, input, InputSignal } from '@angular/core';
import { ActionRequiredItemListComponent } from '../../../items/components/action-required-item-list/action-required-item-list.component';
import { SentProposalItemListComponent } from '../../../items/components/sent-proposal-item-list/sent-proposal-item-list.component';
import { ReadonlyItemListComponent } from '../../../items/components/readonly-item-list/readonly-item-list.component';
import { SharedCardComponent } from '../../../../shared/components/shared-card/shared-card.component';

@Component({
  selector: 'app-item-management-dashboard',
  imports: [ActionRequiredItemListComponent, SentProposalItemListComponent, ReadonlyItemListComponent, SharedCardComponent],
  templateUrl: './item-management-dashboard.component.html',
  styleUrl: './item-management-dashboard.component.scss'
})
export class ItemManagementDashboardComponent {

    partyId: InputSignal<number> = input.required();
}
