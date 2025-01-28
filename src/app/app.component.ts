import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemManagementDashboardComponent } from './features/dashboard/components/item-management-dashboard/item-management-dashboard.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { UserService } from './services/users/user.service';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from './features/users/users/user';
import { OwnersService } from './services/owners.service';
import { Owner } from './features/owners/models/owner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ItemManagementDashboardComponent,
    SidebarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isInitializing = signal<boolean>(true);
  activeUser = signal<User>({} as User);
  users: User[] = [];

  constructor(private userService: UserService, private ownerService: OwnersService) {}

  ngOnInit(): void {
    this.ownerService.setInitialOwners()
      .pipe(switchMap(() => this.setUsersAndActiveUser()))
      .subscribe();
  }

  private setUsersAndActiveUser(): Observable<User> {
    return this.userService.getUsers()
    .pipe(
      tap(users => this.users = users),
      switchMap(() => this.subscribeToActiveUser()),
      tap(() => this.isInitializing.set(false))
    );
  }

  private subscribeToActiveUser(): Observable<User> {
    return this.userService.getActiveUser()
      .pipe(
        tap(user => this.activeUser.set(user))
      );
  }
}
