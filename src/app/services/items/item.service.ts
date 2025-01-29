import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Item } from '../../features/items/models/item';
import { PartyItem } from '../../features/items/models/party-item';
import { Owner } from '../../features/owners/models/owner';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { OwnersService } from '../owners.service';
import { ItemStatusEnum } from '../../features/items/models/item-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly ITEMS_STORAGE_KEY = 'party_items';
  private itemsSubject = new BehaviorSubject<PartyItem[]>([]);
  private items$: Observable<PartyItem[]> = this.itemsSubject.asObservable();

  constructor(private http: HttpClient,
              private ownerService: OwnersService,
              private localStorageService: LocalStorageService
  ) {}

  public initializeItems(): Observable<void> {
    const storedItems = this.getPersistentItems();
    return storedItems ? this.setItems(storedItems) : this.setInitialItems();
  }

  private setInitialItems(): Observable<void> {
    return this.http.get<Item[]>('assets/items.json')
      .pipe(
        switchMap(items => this.setItems(items)),
        catchError(err => throwError(() => new Error(`Error initializing items: ${err}`)))
      );
  }

  private setItems(items: Item[]): Observable<void> {
    const partyItems = this.toPartyItems(items);
    this.itemsSubject.next(partyItems);
    this.persistItems(partyItems);
    return of();
  }

  public getExclusiveItems(): Observable<PartyItem[]> {
    return this.getExclusiveOrSharedItems(false);
  }

  public getSharedItems(): Observable<PartyItem[]> {
    return this.getExclusiveOrSharedItems(true);
  }

  public getFinalizedSharedItems(): Observable<PartyItem[]> {
    return this.items$.pipe(
      map(items => items
        .filter(item => item.status === ItemStatusEnum.ACCEPTED)
      )
    );
  }

  private getExclusiveOrSharedItems(shouldBeShared: boolean): Observable<PartyItem[]> {
    return this.items$.pipe(
      map(items => items
        .filter(item => item.isShared === shouldBeShared)
      )
    );
  }

  public updateItem(item: PartyItem): Observable<void> {
    const index = this.findItemIndexById(item.id);
    const updatedItems = [...this.itemsSubject.getValue()];
    updatedItems[index] = item;
    return this.setItems(updatedItems);
  }

  private findItemIndexById(id: number): number {
    return this.itemsSubject.getValue().findIndex(item => item.id === id);
  }

  private getPersistentItems(): PartyItem[] | null {
    return this.localStorageService.loadData(this.ITEMS_STORAGE_KEY);
  }

  private persistItems(items: PartyItem[]): void {
    this.localStorageService.saveData(this.ITEMS_STORAGE_KEY, items);
  }

  private toPartyItems(items: Item[]): PartyItem[] {
    const owners = this.ownerService.getPersistentOwners();
    return items.map(item => {
      const itemOwners = owners.filter(o => item.ownerIds.includes(o.id));
      return this.toPartyItem(item, itemOwners);
    });
  }

  private toPartyItem(item: Item, owners: Owner[]): PartyItem {
    return new PartyItem(
      item.id,
      item.name,
      item.description,
      item.totalCost,
      item.ownerIds,
      owners,
      item.status,
      item.proposals || []
    );
  }

}
