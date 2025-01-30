import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalComponent } from './proposal.component';
import { ItemService } from '../../../../services/items/item.service';

describe('ProposalComponent', () => {
  let component: ProposalComponent;
  let fixture: ComponentFixture<ProposalComponent>;
  let mockItemService: Partial<ItemService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalComponent],
      providers: [
        {provide: ItemService, useValue: mockItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
