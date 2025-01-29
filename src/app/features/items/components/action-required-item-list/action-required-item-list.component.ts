import { Component, OnInit } from '@angular/core';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';
import { PartyItem } from '../../models/party-item';
import { AbstractItemListComponent } from '../abstract-item-list/abstract-item-list.component';
import { ItemDetailSidePanelComponent } from '../item-detail-side-panel/item-detail-side-panel.component';
import { ItemRowDataComponent } from "../item-row-data/item-row-data.component";

@Component({
  selector: 'app-action-required-item-list',
  imports: [
    SharedTableComponent,
    ItemDetailSidePanelComponent,
    ItemRowDataComponent
],
  templateUrl: './action-required-item-list.component.html',
  styleUrl: './action-required-item-list.component.scss'
})
export abstract class ActionRequiredItemListComponent extends AbstractItemListComponent implements OnInit {

  public override ngOnInit(): void {
    this.columns = [
      { field: 'id', label: 'ID', width: '5%', minWidth: '1rem' },
      { field: 'name', label: 'Name', width: '20%', minWidth: '8rem' },
      { field: 'description', label: 'Description', width: '30%', minWidth: '8rem' },
      { field: 'totalCost', label: 'Total Cost', width: '15%', minWidth: '5rem' },
      { field: 'owners', label: 'Owners', width: '20%', minWidth: '5rem' },
      { field: 'status', label: 'Status', width: '10%', minWidth: '8rem' }
    ];

    super.ngOnInit();
  }

  protected abstract override subscribeToItems(): void;

  public openItemDetails(item: PartyItem): void {
    this.selectedItem = item;
    this.showSidePanel = true;
  }

  public closeSidePanel(): void {
    this.showSidePanel = false;
    this.selectedItem = null;
  }
}
