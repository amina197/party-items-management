import { Component, computed, input, InputSignal, OnInit, Signal, signal } from '@angular/core';
import { User } from '../../../users/users/user';
import { OwnersService } from '../../../../services/owners.service';
import { Owner } from '../../../owners/models/owner';
import { tap } from 'rxjs';
import { CalculateProgressPipe } from '../../../../shared/pipes/calculate-progress.pipe';

@Component({
  selector: 'app-budget',
  imports: [CalculateProgressPipe],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {
  activeUser: InputSignal<User> = input.required();
  owners = signal<Owner[]>([]);
  owner: Signal<Owner> = computed(() => this.setOwner());

  constructor(private ownerService: OwnersService) {}

  ngOnInit(): void {
    this.ownerService.getCurrentOwners()
    .pipe(
      tap(owners => this.owners.set(owners))
    )
    .subscribe();
  }

  private setOwner(): Owner {
    const owner = this.owners().find(o => o.id === this.activeUser().partyId);
    return owner || {} as Owner;
  }
}
