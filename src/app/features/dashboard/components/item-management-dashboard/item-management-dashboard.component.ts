import { Component, input, InputSignal, OnInit } from '@angular/core';
import { ItemService } from '../../../../services/items/item.service';
import { SharedCardComponent } from '../../../../shared/components/shared-card/shared-card.component';
import { ActionRequiredItemListComponent } from '../../../items/components/action-required-item-list/action-required-item-list.component';
import { ReadonlyItemListComponent } from '../../../items/components/readonly-item-list/readonly-item-list.component';
import { User } from '../../../users/users/user';
import {  FinalizedSharedItemListComponent } from "../../../items/components/finalized-shared-item-list/finalized-shared-item-list.component";
import { ProposalEligibleSharedItemListComponent } from '../../../items/components/proposal-eligible-shared-item-list/proposal-eligible-shared-item-list.component';

@Component({
  selector: 'app-item-management-dashboard',
  imports: [
    ProposalEligibleSharedItemListComponent,
    ReadonlyItemListComponent,
    SharedCardComponent,
    FinalizedSharedItemListComponent
  ],
  templateUrl: './item-management-dashboard.component.html',
  styleUrl: './item-management-dashboard.component.scss'
})
export class ItemManagementDashboardComponent implements OnInit {

    activeUser: InputSignal<User> = input.required();

    constructor(private itemService: ItemService) {}

    public ngOnInit(): void {
      this.itemService.initializeItems();
    }
}
