import { Component, input, InputSignal, OnInit, signal } from '@angular/core';
import { PartyItem } from '../../models/items/party-item';
import { ItemService } from '../../services/item.service';
import { StatusEnum } from '../../shared/enums/status.enum';
import { tap } from 'rxjs';
import { SharedTableComponent } from '../../shared/components/shared-table/shared-table.component';
import { TableColumn } from '../../shared/models/table-column';

@Component({
  selector: 'app-action-required-item-list',
  imports: [SharedTableComponent],
  templateUrl: './action-required-item-list.component.html',
  styleUrl: './action-required-item-list.component.scss'
})
export class ActionRequiredItemListComponent implements OnInit {

  partyId: InputSignal<number> = input.required();
  actionRequiredItems = signal<PartyItem[]>([]);

  readonly columns: TableColumn[] = [
    { field: 'id', label: 'ID', width: '5%' },
    { field: 'name', label: 'Name', width: '20%' },
    { field: 'description', label: 'Description', width: '35%' },
    { field: 'totalCost', label: 'Total Cost', width: '10%' },
    { field: 'ownerIds', label: 'Owners', width: '10%' },
    { field: 'status', label: 'Status', width: '20%' }
  ];

  readonly actionRequiredStatuses = [
    StatusEnum.PENDING,
    StatusEnum.RECEIVED
  ];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.subscribeToActionRequiredItems();
  }

  private subscribeToActionRequiredItems(): void {
    this.itemService.getItemsByPartyAndStatus(this.partyId(), this.actionRequiredStatuses)
      .pipe(
        tap(items => this.actionRequiredItems.set(items))
      ).subscribe();
  }
}
