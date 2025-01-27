import { Injectable } from '@angular/core';
import { User } from '../../features/users/users/user';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly ACTIVE_USER_STORAGE_KEY = 'active_user';
  private activeUserSubject = new BehaviorSubject<User>({} as User);
  private activeUser$: Observable<User> = this.activeUserSubject.asObservable();

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService
  ) { }

  public setActiveUser(user: User): void {
    this.activeUserSubject.next(user);
  }

  public getActiveUser(): Observable<User> {
    return this.activeUser$;
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/users.json')
      .pipe(
        map(users => {
          this.initializeActiveUser(users);
          return users;
        }),
        catchError(err => throwError(() => new Error(`Error initializing items: ${err}`)))
      );
  }

  private initializeActiveUser(users: User[]): void {
    const storedActiveUser = this.getActiveUserFromLocalStorage();
    if (storedActiveUser && users.includes(storedActiveUser)) {
      this.setActiveUser(storedActiveUser);
    } else {
      this.setActiveUser(users[0]);
    }
  }

  private getActiveUserFromLocalStorage(): User | null {
    return this.localStorageService.loadData(this.ACTIVE_USER_STORAGE_KEY);
  }

}
