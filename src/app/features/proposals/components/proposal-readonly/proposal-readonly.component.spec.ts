import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalReadonlyComponent } from './proposal-readonly.component';

describe('ProposalReadonlyComponent', () => {
  let component: ProposalReadonlyComponent;
  let fixture: ComponentFixture<ProposalReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
