import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRequiredProposalComponent } from './action-required-proposal.component';
import { OwnersService } from '../../../../services/owners.service';

describe('ActionRequiredProposalComponent', () => {
  let component: ActionRequiredProposalComponent;
  let fixture: ComponentFixture<ActionRequiredProposalComponent>;
  let mockOwnerService: Partial<OwnersService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionRequiredProposalComponent],
      providers: [
        {provide: OwnersService, useValue: mockOwnerService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRequiredProposalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
