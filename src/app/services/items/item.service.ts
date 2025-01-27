import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { StatusEnum } from '../../shared/enums/status.enum';
import { Item } from '../../features/items/models/item';
import { PartyItem } from '../../features/items/models/party-item';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly ITEMS_STORAGE_KEY = 'party_items';
  private itemsSubject = new BehaviorSubject<PartyItem[]>([]);
  private items$: Observable<PartyItem[]> = this.itemsSubject.asObservable();

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService
  ) {
    this.initializeItems();
  }

  public getItemsByStatus(statuses: StatusEnum[]): Observable<PartyItem[]> {
    return this.items$.pipe(
      map(items => items
        .filter(item => item.isWithStatus(statuses))
      )
    );
  }

  private initializeItems(): void {
    const storedItems = this.getPersistentItems();

    if (storedItems) {
      this.setItems(storedItems);
    } else {
      this.setInitialItems();
    }
  }

  private setInitialItems(): void {
    this.http.get<Item[]>('assets/items.json')
      .pipe(
        tap(items => {
          this.setItems(items);
          this.persistItems(items);
        }),
        catchError(err => throwError(() => new Error(`Error initializing items: ${err}`)))
      ).subscribe();
  }

  private setItems(items: Item[]): void {
    const partyItems = this.toPartyItems(items);
    this.itemsSubject.next(partyItems);
  }

  private getPersistentItems(): PartyItem[] | null {
    return this.localStorageService.loadData(this.ITEMS_STORAGE_KEY);
  }

  private persistItems(items: Item[]): void {
    const initializedItems = this.toPartyItems(items);
    this.localStorageService.saveData(this.ITEMS_STORAGE_KEY, initializedItems);
  }

  private toPartyItems(items: Item[]): PartyItem[] {
    return items.map(item => this.toPartyItem(item));
  }

  private toPartyItem(item: Item): PartyItem {
    return new PartyItem(
      item.id,
      item.name,
      item.description,
      item.totalCost,
      item.ownerIds
    );
  }

}
