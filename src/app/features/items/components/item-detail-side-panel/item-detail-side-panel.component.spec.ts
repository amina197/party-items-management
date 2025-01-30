import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailSidePanelComponent } from './item-detail-side-panel.component';
import { ItemService } from '../../../../services/items/item.service';

describe('ItemDetailSidePanelComponent', () => {
  let component: ItemDetailSidePanelComponent;
  let fixture: ComponentFixture<ItemDetailSidePanelComponent>;
    let mockItemService: Partial<ItemService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailSidePanelComponent],
      providers: [
        {provide: ItemService, useValue: mockItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailSidePanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
