import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentProposalItemListComponent } from './sent-proposal-item-list.component';

describe('SentProposalItemListComponent', () => {
  let component: SentProposalItemListComponent;
  let fixture: ComponentFixture<SentProposalItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentProposalItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentProposalItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
