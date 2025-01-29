import { Component } from '@angular/core';
import { ActionRequiredItemListComponent } from '../action-required-item-list/action-required-item-list.component';
import { map, tap } from 'rxjs';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';
import { ItemDetailSidePanelComponent } from '../item-detail-side-panel/item-detail-side-panel.component';
import { ItemRowDataComponent } from '../item-row-data/item-row-data.component';
import { ItemStatusEnum } from '../../models/item-status.enum';

@Component({
  selector: 'app-proposal-eligible-shared-item-list',
  imports: [SharedTableComponent, ItemDetailSidePanelComponent, ItemRowDataComponent],
  templateUrl: '../action-required-item-list/action-required-item-list.component.html',
  styleUrl: '../action-required-item-list/action-required-item-list.component.scss'
})
export class ProposalEligibleSharedItemListComponent extends ActionRequiredItemListComponent {

    protected override subscribeToItems(): void {
      this.itemService.getSharedItems()
        .pipe(
          map(items => items.filter(item => item.status !== ItemStatusEnum.ACCEPTED)),
          tap(items => this.items.set(items)))
        .subscribe();
    }
}
