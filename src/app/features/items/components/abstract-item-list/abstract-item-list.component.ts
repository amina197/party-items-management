import { NgClass } from '@angular/common';
import { Component, computed, input, InputSignal, OnInit, Signal, signal } from '@angular/core';
import { ItemService } from '../../../../services/items/item.service';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { User } from '../../../users/users/user';
import { ItemTableColumn } from '../../models/item-table-column';
import { PartyItem } from '../../models/party-item';
import { ItemStatusToClassPipe } from "../../pipes/item-status-to-class.pipe";
import { ItemDetailSidePanelComponent } from "../item-detail-side-panel/item-detail-side-panel.component";


@Component({
  selector: 'app-abstract-item-list',
  imports: [
    SharedTableComponent,
    NgClass,
    ItemStatusToClassPipe,
    ItemDetailSidePanelComponent
],
  templateUrl: './abstract-item-list.component.html',
  styleUrl: './abstract-item-list.component.scss'
})
export abstract class AbstractItemListComponent implements OnInit {

  activeUser: InputSignal<User> = input.required();
  ownerId: Signal<number> = computed(() => this.activeUser().partyId);
  items = signal<PartyItem[]>([]);
  filteredItems = computed(() => this.filterOwnedByPartyItems());
  selectedItem: PartyItem | null = null;
  showSidePanel = false;

  columns: ItemTableColumn[] = [];

  protected statuses: StatusEnum[] = [];

  constructor(protected itemService: ItemService) {}

  public ngOnInit(): void {
    this.subscribeToItems();
  }

  protected abstract subscribeToItems(): void;

  private filterOwnedByPartyItems(): PartyItem[] {
    return this.items()
      .filter(item => item.isOwnedByParty(this.ownerId()))
      .map(item => {
        item.setStatus(this.ownerId());
        return item;
      });
  }

  public openItemDetails(item: PartyItem): void {
    this.selectedItem = item;
    this.showSidePanel = true;
  }

  public closeSidePanel(): void {
    this.showSidePanel = false;
    this.selectedItem = null;
  }
}
