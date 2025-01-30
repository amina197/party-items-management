import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetComponent } from './budget.component';
import { OwnersService } from '../../../../services/owners.service';
import { Owner } from '../../../owners/models/owner';
import { of } from 'rxjs';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let mockOwnerService: Partial<OwnersService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetComponent],
      providers: [
        {provide: OwnersService, useValue: mockOwnerService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
