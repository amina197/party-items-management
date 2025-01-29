import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Owner } from '../features/owners/models/owner';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  private readonly OWNERS_STORAGE_KEY = 'owners';

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService
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

  public getOwners(): Observable<Owner[]> {
    const persistentOwners = this.getPersistentOwners();
    if (persistentOwners.length) {
      return of(persistentOwners);
    }

    return this.setInitialOwners();
  }

  public getPersistentOwners(): Owner[] {
    return this.localStorageService.loadData(this.OWNERS_STORAGE_KEY) || [];
  }

  private persistOwners(owners: Owner[]): void {
    this.localStorageService.saveData(this.OWNERS_STORAGE_KEY, owners);
  }

  private buildOwner(owner: Owner) {
    return new Owner(owner.id, owner.name, owner.remainingBudget);
  }
}
