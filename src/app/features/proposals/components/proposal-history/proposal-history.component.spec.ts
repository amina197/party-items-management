import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalHistoryComponent } from './proposal-history.component';
import { PartyItem } from '../../../items/models/party-item';
import { ComponentRef } from '@angular/core';
import { User } from '../../../users/users/user';
import { ItemProposal } from '../../models/item-proposal/item-proposal';

describe('ProposalHistoryComponent', () => {
  let component: ProposalHistoryComponent;
  let componentRef: ComponentRef<ProposalHistoryComponent>;
  let fixture: ComponentFixture<ProposalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalHistoryComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    component.activeUser = { partyId: 1 } as User;
    componentRef.setInput('item', {proposals: [] as ItemProposal[]} as PartyItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
