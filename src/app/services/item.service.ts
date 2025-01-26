import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { StatusEnum } from '../shared/enums/status.enum';
import { Item } from '../features/items/models/item';
import { PartyItem } from '../features/items/models/party-item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly ITEMS_STORAGE_KEY = 'party_items';
  private itemsSubject = new BehaviorSubject<PartyItem[]>([]);
  private items$: Observable<PartyItem[]> = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeItems();
  }

  private initializeItems(): void {
    this.http.get<Item[]>('assets/items.json')
    .pipe(
      map(items => {
        const initializedItems = items.map(item => this.toPartyItem(item));
        this.storeItems(initializedItems);
        this.itemsSubject.next(initializedItems);
      }),
      catchError(err => throwError(() => new Error(`Error initializing items: ${err}`)))
    ).subscribe();
  }

  private storeItems(items: Item[]): void {
    localStorage.setItem(this.ITEMS_STORAGE_KEY, JSON.stringify(items));
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

  public getItemsByPartyAndStatus(partyId: number, statuses: StatusEnum[]): Observable<PartyItem[]> {
    return this.items$.pipe(
      map(items => items
        .filter(item => item.isOwnedByPartyWithStatus(partyId, statuses))
      )
    );
  }

}
