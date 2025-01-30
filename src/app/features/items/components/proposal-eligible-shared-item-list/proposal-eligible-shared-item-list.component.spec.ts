import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalEligibleSharedItemListComponent } from './proposal-eligible-shared-item-list.component';
import { ItemService } from '../../../../services/items/item.service';

describe('ProposalEligibleSharedItemListComponent', () => {
  let component: ProposalEligibleSharedItemListComponent;
  let fixture: ComponentFixture<ProposalEligibleSharedItemListComponent>;
  let mockItemService: Partial<ItemService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalEligibleSharedItemListComponent],
      providers: [
        {provide: ItemService, useValue: mockItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalEligibleSharedItemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
