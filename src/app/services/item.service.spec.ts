import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { StatusEnum } from '../shared/enums/status.enum';
import { PartyItem } from '../features/items/models/party-item';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  const mockItems = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      totalCost: 100,
      ownerIds: [1],
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description 2',
      totalCost: 200,
      ownerIds: [1, 2],
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

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test items initialization', () => {
    afterEach(() => httpMock.verify());

    it('should fetch items from JSON and initialize them', () => {
      const req = httpMock.expectOne('assets/items.json');
      expect(req.request.method).toBe('GET');

      req.flush(mockItems);

      const storedItems = JSON.parse(localStorage.getItem(service['ITEMS_STORAGE_KEY'])!);
      expect(storedItems).toHaveLength(2);
      expect(storedItems[0].id).toBe(1);
      expect(storedItems[1].id).toBe(2);
    });

    it('should handle errors when initializing items', () => {
      const req = httpMock.expectOne('assets/items.json');
      req.error(new ProgressEvent('Network error'));

      expect(localStorage.getItem(service['ITEMS_STORAGE_KEY'])).toBeNull();
    });
  });

  describe('Test getItemsByPartyAndStatus method', () => {
    it('should filter items by partyId and status', (done) => {

      const partyItems = mockItems.map(item => new PartyItem(item.id, item.name, item.description, item.totalCost, item.ownerIds));
      localStorage.setItem(service['ITEMS_STORAGE_KEY'], JSON.stringify(partyItems));
      service['itemsSubject'].next(partyItems);

      service.getItemsByPartyAndStatus(1, [StatusEnum.PENDING])
        .subscribe(filteredItems => {
          expect(filteredItems).toHaveLength(1);
          expect(filteredItems[0].id).toBe(2);
          done();
        });
    });

    it('should return an empty array if no items match the filters', (done) => {
      const partyItems = mockItems.map(item => new PartyItem(item.id, item.name, item.description, item.totalCost, item.ownerIds));
      localStorage.setItem(service['ITEMS_STORAGE_KEY'], JSON.stringify(partyItems));
      service['itemsSubject'].next(partyItems);

      service.getItemsByPartyAndStatus(3, [StatusEnum.FINALIZED])
      .subscribe(filteredItems => {
        expect(filteredItems).toHaveLength(0);
        done();
      });
    });
  });

  describe('Test toPartyItem method', () => {
    it('should convert an Item to a PartyItem', () => {
      const item = {
        id: 1,
        name: 'Test Item',
        description: 'Test Description',
        totalCost: 500,
        ownerIds: [1, 2],
        status: StatusEnum.PENDING
      };

      const partyItem = service['toPartyItem'](item);
      expect(partyItem).toBeInstanceOf(PartyItem);
      expect(partyItem.id).toBe(item.id);
      expect(partyItem.name).toBe(item.name);
      expect(partyItem.description).toBe(item.description);
      expect(partyItem.totalCost).toBe(item.totalCost);
      expect(partyItem.ownerIds).toEqual(item.ownerIds);
    });
  });

});
