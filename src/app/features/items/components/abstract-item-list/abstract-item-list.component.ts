import { computed, Directive, input, InputSignal, OnInit, Signal, signal } from '@angular/core';
import { ItemService } from '../../../../services/items/item.service';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { User } from '../../../users/users/user';
import { ItemTableColumn } from '../../models/item-table-column';
import { PartyItem } from '../../models/party-item';


@Directive()
export abstract class AbstractItemListComponent implements OnInit {

  activeUser: InputSignal<User> = input.required();
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
      .filter(item => item.isOwnedByParty(this.activeUser().partyId))
      .map(item => {
        item.setStatusForParty(this.activeUser().partyId);
        return item;
      });
  }
}
