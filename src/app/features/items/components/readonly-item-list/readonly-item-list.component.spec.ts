import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyItemListComponent } from './readonly-item-list.component';
import { OwnersService } from '../../../../services/owners.service';
import { ItemService } from '../../../../services/items/item.service';

describe('ReadonlyItemListComponent', () => {
  let component: ReadonlyItemListComponent;
  let fixture: ComponentFixture<ReadonlyItemListComponent>;
  let mockOwnerService: Partial<OwnersService> = {};
  let mockItemService: Partial<ItemService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyItemListComponent],
      providers: [
        {provide: OwnersService, useValue: mockOwnerService},
        {provide: ItemService, useValue: mockItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadonlyItemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
