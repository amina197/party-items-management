import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRequiredItemListComponent } from './action-required-item-list.component';
import { ItemService } from '../../services/item.service';
import { ComponentRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PartyItem } from '../../models/items/party-item';
import { StatusEnum } from '../../shared/enums/status.enum';

describe('ActionRequiredItemListComponent', () => {
  let component: ActionRequiredItemListComponent;
  let componentRef: ComponentRef<ActionRequiredItemListComponent>;
  let fixture: ComponentFixture<ActionRequiredItemListComponent>;

  const mockItemService: Partial<ItemService> = {
    getItemsByPartyAndStatus: jest.fn()
  };

  const mockItems = <PartyItem[]>[
    {
      id: 1,
      name: 'Item 1',
      description: 'desc',
      totalCost: 100,
      ownerIds: [1],
      status: StatusEnum.PENDING
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'desc',
      totalCost: 200,
      ownerIds: [1,2],
      status: StatusEnum.RECEIVED
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionRequiredItemListComponent],
      providers: [
        { provide: ItemService, useValue: mockItemService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRequiredItemListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('partyId', 1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnInit method', () => {
    it('should call itemService.getItemsByPartyAndStatus on init and set actionRequiredItems', () => {
      jest.spyOn(mockItemService, 'getItemsByPartyAndStatus').mockReturnValueOnce(of(mockItems));
      fixture.detectChanges();

      expect(mockItemService.getItemsByPartyAndStatus).toHaveBeenCalledTimes(1);
      expect(mockItemService.getItemsByPartyAndStatus).toHaveBeenCalledWith(
        1,
        [StatusEnum.PENDING, StatusEnum.RECEIVED]
      );

      expect(component.actionRequiredItems()).toEqual(mockItems);
    });

    it('should handle error from itemService gracefully', () => {
      jest.spyOn(mockItemService, 'getItemsByPartyAndStatus').mockReturnValueOnce(throwError(() => new Error('Something went wrong')));
      fixture.detectChanges();

      expect(component.actionRequiredItems()).toEqual([]);
    });
  });
});
