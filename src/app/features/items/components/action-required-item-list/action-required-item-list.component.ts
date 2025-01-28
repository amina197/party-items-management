import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';
import { ItemStatusToClassPipe } from '../../pipes/item-status-to-class.pipe';
import { AbstractItemListComponent } from '../abstract-item-list/abstract-item-list.component';
import { ItemDetailSidePanelComponent } from '../item-detail-side-panel/item-detail-side-panel.component';

@Component({
  selector: 'app-action-required-item-list',
  imports: [
    SharedTableComponent,
    NgClass,
    ItemStatusToClassPipe,
    ItemDetailSidePanelComponent
  ],
  templateUrl: '../abstract-item-list/abstract-item-list.component.html',
  styleUrl: '../abstract-item-list/abstract-item-list.component.scss'
})
export class ActionRequiredItemListComponent extends AbstractItemListComponent implements OnInit {

  public override ngOnInit(): void {
    this.columns = [
      { field: 'id', label: 'ID', width: '5%' },
      { field: 'name', label: 'Name', width: '20%' },
      { field: 'description', label: 'Description', width: '35%' },
      { field: 'totalCost', label: 'Total Cost', width: '10%' },
      { field: 'owners', label: 'Owners', width: '10%' },
      { field: 'status', label: 'Status', width: '20%' }
    ];

    super.ngOnInit();
  }


  override subscribeToItems(): void {
    this.itemService.getSharedItems()
      .pipe(
        tap(items => this.items.set(items)))
      .subscribe();
  }
}
