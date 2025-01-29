import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';
import { AbstractItemListComponent } from '../abstract-item-list/abstract-item-list.component';
import { ItemRowDataComponent } from "../item-row-data/item-row-data.component";

@Component({
  selector: 'app-readonly-item-list',
  imports: [
    SharedTableComponent,
    ItemRowDataComponent
],
  templateUrl: './readonly-item-list.component.html',
  styleUrl: './readonly-item-list.component.scss'
})
export class ReadonlyItemListComponent extends AbstractItemListComponent implements OnInit {

  public override ngOnInit(): void {
    this.columns = [
      { field: 'id', label: 'ID', width: '5%', minWidth: '2rem' },
      { field: 'name', label: 'Name', width: '20%', minWidth: '8rem' },
      { field: 'description', label: 'Description', width: '35%', minWidth: '8rem' },
      { field: 'totalCost', label: 'Total Cost', width: '10%', minWidth: '5rem' }
    ];

    super.ngOnInit();
  }

  override subscribeToItems(): void {
    this.itemService.getExclusiveItems()
      .pipe(
        tap(items => this.items.set(items)))
      .subscribe();
  }

}
