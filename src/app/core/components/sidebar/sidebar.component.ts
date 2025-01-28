import { Component, Input, input, InputSignal } from '@angular/core';
import { UserSwitchComponent } from '../../../features/users/components/user-switch/user-switch.component';
import { User } from '../../../features/users/users/user';

@Component({
  selector: 'app-sidebar',
  imports: [
    UserSwitchComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  activeUser: InputSignal<User> = input.required();
  @Input({required: true}) users: User[] = [];

  showSwitchButton = false;
  isSwitchModalOpen = false;

  public onHoverActiveUserInfo(state: boolean): void {
    this.showSwitchButton = state;
  }

  public openSwitchModal(): void {
    this.isSwitchModalOpen = true;
  }

  public closeSwitchModal(): void {
    this.isSwitchModalOpen = false;
  }
}
