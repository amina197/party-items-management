import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProposalFormComponent } from './new-proposal-form.component';

describe('NewProposalFormComponent', () => {
  let component: NewProposalFormComponent;
  let fixture: ComponentFixture<NewProposalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProposalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProposalFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
