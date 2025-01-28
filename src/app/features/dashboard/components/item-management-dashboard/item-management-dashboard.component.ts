import { Component, input, InputSignal, OnInit } from '@angular/core';
import { ItemService } from '../../../../services/items/item.service';
import { SharedCardComponent } from '../../../../shared/components/shared-card/shared-card.component';
import { ActionRequiredItemListComponent } from '../../../items/components/action-required-item-list/action-required-item-list.component';
import { ReadonlyItemListComponent } from '../../../items/components/readonly-item-list/readonly-item-list.component';
import { User } from '../../../users/users/user';

@Component({
  selector: 'app-item-management-dashboard',
  imports: [ActionRequiredItemListComponent, ReadonlyItemListComponent, SharedCardComponent],
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
