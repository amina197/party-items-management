import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PartyItem } from '../models/items/party-item';
import { Item } from '../models/items/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}


  public getOwnedPartyItems(partyId: number): Observable<PartyItem[]> {
    const itemsPath = 'assets/items.json';
    return this.http.get<Item[]>(itemsPath).pipe(
      map(items => this.keepOwnedPartyItemsOnly(items, partyId)),
      catchError((err) => throwError(() => new Error(`Error retrieving owned party items: ${err}`))
    ));
  }

  private keepOwnedPartyItemsOnly(items: Item[], partyId: number): PartyItem[] {
    return items.reduce<PartyItem[]>((acc, item) => {

      const partyItem = this.buildPartyItem(item);

      if (partyItem.isOwnedByParty(partyId)) {
        acc.push(partyItem);
      }

      return acc;
    }, []);
  }

  private buildPartyItem(item: Item): PartyItem {
    return new PartyItem(
      item.id,
      item.name,
      item.description,
      item.totalCost,
      item.ownerIds
    );
  }
}
