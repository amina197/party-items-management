import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterProposalFormComponent } from './counter-proposal-form.component';

describe('CounterProposalFormComponent', () => {
  let component: CounterProposalFormComponent;
  let fixture: ComponentFixture<CounterProposalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterProposalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterProposalFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
