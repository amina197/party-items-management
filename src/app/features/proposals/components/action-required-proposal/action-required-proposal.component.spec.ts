import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRequiredProposalComponent } from './action-required-proposal.component';

describe('ActionRequiredProposalComponent', () => {
  let component: ActionRequiredProposalComponent;
  let fixture: ComponentFixture<ActionRequiredProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionRequiredProposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRequiredProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
