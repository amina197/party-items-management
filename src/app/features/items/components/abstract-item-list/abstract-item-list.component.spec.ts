import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractItemListComponent } from './abstract-item-list.component';
import { ComponentRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PartyItem } from '../../models/party-item';
import { ItemService } from '../../../../services/items/item.service';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { ActionRequiredItemListComponent } from '../action-required-item-list/action-required-item-list.component';
import { Item } from '../../models/item';


describe('AbstractItemListComponent', () => {
  let component: AbstractItemListComponent;
  let componentRef: ComponentRef<AbstractItemListComponent>;
  let fixture: ComponentFixture<AbstractItemListComponent>;

  const mockItemService: Partial<ItemService> = {
    getItemsByStatus: jest.fn()
  };

  const mockItems = <Item[]>[
    {
      id: 1,
      name: 'Item 1',
      description: 'desc',
      totalCost: 100,
      owners: [1],
      status: StatusEnum.PENDING
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'desc',
      totalCost: 200,
      owners: [1,2],
      status: StatusEnum.RECEIVED
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractItemListComponent],
      providers: [
        { provide: ItemService, useValue: mockItemService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRequiredItemListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('partyId', 2);
  });

  afterEach(() => jest.resetAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnInit method', () => {
    it('should call itemService.getItemsByStatus on init and set actionRequiredItems', () => {
      const partyItems = getMockPartyItems(mockItems);
      jest.spyOn(mockItemService, 'getItemsByStatus').mockReturnValueOnce(of(partyItems));
      fixture.detectChanges();

      expect(mockItemService.getItemsByStatus).toHaveBeenCalledTimes(1);
      expect(mockItemService.getItemsByStatus).toHaveBeenCalledWith(
        [StatusEnum.PENDING, StatusEnum.RECEIVED]
      );

      expect(component.items()).toHaveLength(2);
      expect(component.items()).toEqual(partyItems);
    });

    it('should handle error from itemService gracefully', () => {
      jest.spyOn(mockItemService, 'getItemsByStatus').mockReturnValueOnce(throwError(() => new Error('Something went wrong')));
      fixture.detectChanges();

      expect(component.items()).toEqual([]);
    });
  });

  describe('Test filteredItems computation', () => {

    it('should set filteredItems with owned party items only', () => {
      const partyItems = getMockPartyItems(mockItems);
      jest.spyOn(mockItemService, 'getItemsByStatus').mockReturnValueOnce(of(partyItems));

      fixture.detectChanges();

      expect(component.filteredItems()).toHaveLength(1);
      expect(component.filteredItems()[0]).toEqual(partyItems[1]);
      expect(component.filteredItems()[0].id).toBe(2);
    });
  });
});

function getMockPartyItems(mockItems: Item[]) {
  return mockItems.map(item => new PartyItem(item.id, item.name, item.description, item.totalCost, item.owners));
}

