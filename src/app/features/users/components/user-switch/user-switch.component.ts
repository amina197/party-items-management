import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../users/user';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-user-switch',
  imports: [],
  templateUrl: './user-switch.component.html',
  styleUrl: './user-switch.component.scss'
})
export class UserSwitchComponent {

    @Input({required: true}) activeUser!: User;
    @Input({required: true}) users: User[] = [];

    @Output() close = new EventEmitter<void>();

    constructor(private userService: UserService) {}

    onSelectUser(user: User): void {
      if (this.activeUser.id !== user.id) {
        this.userService.setActiveUser(user);
      }

      this.close.emit();
    }

    onCloseModal(): void {
      this.close.emit();
    }
}
