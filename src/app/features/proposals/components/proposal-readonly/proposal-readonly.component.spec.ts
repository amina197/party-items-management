import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalReadonlyComponent } from './proposal-readonly.component';
import { ProposalService } from '../../../../services/proposals/proposal.service';

describe('ProposalReadonlyComponent', () => {
  let component: ProposalReadonlyComponent;
  let fixture: ComponentFixture<ProposalReadonlyComponent>;
  let mockProposalService: Partial<ProposalService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalReadonlyComponent],
      providers: [
        {provide: ProposalService, useValue: mockProposalService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalReadonlyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
