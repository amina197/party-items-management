import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemStatusEnum } from '../../features/items/models/item-status.enum';
import { PartyItem } from '../../features/items/models/party-item';
import { Owner } from '../../features/owners/models/owner';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  const mockItems = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      totalCost: 100,
      ownerIds: [1]
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description 2',
      totalCost: 200,
      ownerIds: [1, 2]
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test toPartyItem method', () => {
    it('should convert an Item to a PartyItem', () => {
      const item = {
        id: 1,
        name: 'Test Item',
        description: 'Test Description',
        totalCost: 500,
        ownerIds: [1, 2],
        owners: [],
        status: ItemStatusEnum.ACTION_REQUIRED,
        proposals: []
      };

      const partyItem = service['toPartyItem'](item, [] as Owner[]);
      expect(partyItem).toBeInstanceOf(PartyItem);
      expect(partyItem.id).toBe(item.id);
      expect(partyItem.name).toBe(item.name);
      expect(partyItem.description).toBe(item.description);
      expect(partyItem.totalCost).toBe(item.totalCost);
      expect(partyItem.ownerIds).toEqual(item.ownerIds);
    });
  });

});
