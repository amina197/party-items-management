import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { ItemStatusEnum } from '../features/items/models/item-status.enum';
import { PartyItem } from '../features/items/models/party-item';
import { Owner } from '../features/owners/models/owner';
import { ItemProposal } from '../features/proposals/models/item-proposal/item-proposal';
import { LocalStorageService } from './local-storage/local-storage.service';
import { ProposalService } from './proposals/proposal.service';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  private readonly OWNERS_STORAGE_KEY = 'owners';
  private ownersSubject = new BehaviorSubject<Owner[]>([]);
  private owners$: Observable<Owner[]> = this.ownersSubject.asObservable();

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private proposalService: ProposalService
  ) {}

  private setInitialOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>('assets/owners.json')
      .pipe(
        tap(owners => {
          const finalOwners = owners.map(owner => this.buildOwner(owner));
          this.persistOwners(finalOwners)
        }),
        catchError(err => throwError(() => new Error(`Error initializing owners: ${err}`)))
      );
  }

  public getCurrentOwners(): Observable<Owner[]> {
    return this.owners$;
  }

  public getOwners(): Observable<Owner[]> {
    const persistentOwners = this.getPersistentOwners();
    if (persistentOwners.length) {
      this.ownersSubject.next(persistentOwners);
      return of(persistentOwners);
    }

    return this.setInitialOwners();
  }

  public updateOwnersBudget(item: PartyItem): void {
    if (item.status === ItemStatusEnum.ACCEPTED) {
      const acceptedProposal = item.proposals.find(p => this.proposalService.isProposalAccepted(p));
      if (acceptedProposal) {
        const owners = this.setOwnersRemainingBudget(item, acceptedProposal);
        this.persistOwners(owners);
      }
    }
  }

  private setOwnersRemainingBudget(item: PartyItem, acceptedProposal: ItemProposal): Owner[] {
    const owners =  this.getPersistentOwners();

    item.owners.forEach(owner => {
      const ratio = acceptedProposal.paymentRatios[owner.id];
      if (ratio) {
        owner.remainingBudget -= item.totalCost * (ratio / 100);
        const index = owners.findIndex(o => o.id === owner.id);
        owners[index] = owner;
      }
    });

    return owners;
  }

  public getPersistentOwners(): Owner[] {
    return this.localStorageService.loadData(this.OWNERS_STORAGE_KEY) || [];
  }

  private persistOwners(owners: Owner[]): void {
    this.ownersSubject.next(owners);
    this.localStorageService.saveData(this.OWNERS_STORAGE_KEY, owners);
  }

  private buildOwner(owner: Owner) {
    return new Owner(owner.id, owner.name, owner.remainingBudget);
  }
}
