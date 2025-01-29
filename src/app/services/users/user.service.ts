import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/users/users/user';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { OwnersService } from '../owners.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly ACTIVE_USER_STORAGE_KEY = 'active_user';
  private readonly USERS_STORAGE_KEY = 'users';
  private activeUserSubject = new BehaviorSubject<User>({} as User);
  private activeUser$: Observable<User> = this.activeUserSubject.asObservable();

  constructor(private http: HttpClient,
              private ownerService: OwnersService,
              private localStorageService: LocalStorageService
  ) {}

  public setActiveUser(user: User): void {
    this.activeUserSubject.next(user);
    this.persistActiveUser(user);
  }

  public getActiveUser(): Observable<User> {
    return this.activeUser$;
  }

  public getUsers(): Observable<User[]> {
    const users = this.getPersistentUsers();
    if (users.length) {
      this.initializeActiveUser(users);
      return of(users);
    }

    return this.initializeUsers();
  }

  private initializeUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/users.json')
    .pipe(
      map(users => {
        this.setUsersParty(users);

        this.persistUsers(users);
        this.initializeActiveUser(users);
        return users;
      }),
      catchError(err => throwError(() => new Error(`Error initializing users: ${err}`)))
    );
  }

  private setUsersParty(users: User[]): void {
    users.forEach(user => {
      const parties = this.ownerService.getPersistentOwners();
      const userParty = parties.find(o => o.id === user.partyId);
      if (userParty) {
        user.party = userParty;
      }
    });
  }

  private initializeActiveUser(users: User[]): void {
    const storedActiveUser = this.getPersistentActiveUser();
    const currentActiveUser = storedActiveUser || users[0];
    this.setActiveUser(currentActiveUser);
  }

  private persistUsers(users: User[]): void {
    this.localStorageService.saveData(this.USERS_STORAGE_KEY, users);
  }

  private getPersistentUsers(): User[] {
    return this.localStorageService.loadData(this.USERS_STORAGE_KEY) || [];
  }

  private persistActiveUser(user: User): void {
    this.localStorageService.saveData(this.ACTIVE_USER_STORAGE_KEY, user);
  }

  private getPersistentActiveUser(): User | null {
    return this.localStorageService.loadData(this.ACTIVE_USER_STORAGE_KEY);
  }

}
