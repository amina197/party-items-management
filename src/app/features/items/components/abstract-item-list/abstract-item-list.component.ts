import { Component, input, InputSignal, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';
import { PartyItem } from '../../models/party-item';
import { ItemTableColumn } from '../../models/item-table-column';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { ItemService } from '../../../../services/item.service';


@Component({
  selector: 'app-abstract-item-list',
  imports: [SharedTableComponent],
  templateUrl: './abstract-item-list.component.html',
  styleUrl: './abstract-item-list.component.scss'
})
export abstract class AbstractItemListComponent implements OnInit {

  partyId: InputSignal<number> = input.required();
  items = signal<PartyItem[]>([]);

  readonly columns: ItemTableColumn[] = [
    { field: 'id', label: 'ID', width: '5%' },
    { field: 'name', label: 'Name', width: '20%' },
    { field: 'description', label: 'Description', width: '35%' },
    { field: 'totalCost', label: 'Total Cost', width: '10%' },
    { field: 'ownerIds', label: 'Party Owners', width: '10%' },
    { field: 'status', label: 'Status', width: '20%' }
  ];

  protected statuses: StatusEnum[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.subscribeToPartyItemsWithStatus();
  }

  private subscribeToPartyItemsWithStatus(): void {
    this.itemService.getItemsByPartyAndStatus(this.partyId(), this.statuses)
      .pipe(
        tap(items => this.items.set(items))
      ).subscribe();
  }

  onStatusClick(item: PartyItem) {
    // do something
  }
}
