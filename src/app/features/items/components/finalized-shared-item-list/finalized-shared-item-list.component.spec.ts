import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemService } from '../../../../services/items/item.service';
import { OwnersService } from '../../../../services/owners.service';
import { FinalizedSharedItemListComponent } from './finalized-shared-item-list.component';

describe('FinalizedSharedItemsComponent', () => {
  let component: FinalizedSharedItemListComponent;
  let fixture: ComponentFixture<FinalizedSharedItemListComponent>;
  let mockOwnerService: Partial<OwnersService> = {};
  let mockItemService: Partial<ItemService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizedSharedItemListComponent],
      providers: [
        {provide: OwnersService, useValue: mockOwnerService},
        {provide: ItemService, useValue: mockItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizedSharedItemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
