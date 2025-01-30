import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ActionRequiredItemListComponent } from './action-required-item-list.component';
import { ItemService } from '../../../../services/items/item.service';

@Component({
  selector: 'app-test-action-required-item-list',
  template: ''
})
class TestActionRequiredItemListComponent extends ActionRequiredItemListComponent {
  protected override subscribeToItems(): void {}
}

describe('ActionRequiredItemListComponent', () => {
  let component: TestActionRequiredItemListComponent;
  let fixture: ComponentFixture<TestActionRequiredItemListComponent>;

  let mockItemService: Partial<ItemService> = {
    getSharedItems: jest.fn(),
    getExclusiveItems: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestActionRequiredItemListComponent],
      providers: [
        {provide: ItemService, useValue: mockItemService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestActionRequiredItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});