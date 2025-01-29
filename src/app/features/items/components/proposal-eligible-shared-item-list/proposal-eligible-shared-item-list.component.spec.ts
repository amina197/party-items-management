import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalEligibleSharedItemListComponent } from './proposal-eligible-shared-item-list.component';

describe('ProposalEligibleSharedItemListComponent', () => {
  let component: ProposalEligibleSharedItemListComponent;
  let fixture: ComponentFixture<ProposalEligibleSharedItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalEligibleSharedItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalEligibleSharedItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
