import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemManagementDashboardComponent } from './features/dashboard/components/item-management-dashboard/item-management-dashboard.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { UserService } from './services/users/user.service';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from './features/users/users/user';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setUsersAndActiveUser();
  }

  private setUsersAndActiveUser(): void {
    this.userService.getUsers()
    .pipe(
      tap(users => this.users = users),
      switchMap(() => this.subscribeToActiveUser()),
      tap(() => this.isInitializing.set(false))
    )
    .subscribe();
  }

  private subscribeToActiveUser(): Observable<User> {
    return this.userService.getActiveUser()
      .pipe(
        tap(user => this.activeUser.set(user))
      );
  }
}
