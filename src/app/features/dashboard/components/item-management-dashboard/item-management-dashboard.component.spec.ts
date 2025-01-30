import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementDashboardComponent } from './item-management-dashboard.component';
import { ItemService } from '../../../../services/items/item.service';

describe('ItemManagementDashboardComponent', () => {
  let component: ItemManagementDashboardComponent;
  let fixture: ComponentFixture<ItemManagementDashboardComponent>;
  let mockItemService: Partial<ItemService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemManagementDashboardComponent],
      providers: [
        {provide: ItemService, useValue: mockItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemManagementDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
