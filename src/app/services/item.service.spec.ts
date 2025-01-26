import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Test getOwnedPartyItems method', () => {

    it('should return an observable with owned party items', (done) => {
      const mockPartyId = 1;
      const mockItems = [
        { id: 1, name: 'Cloud subscription', description: 'Annual cloud subscription.', totalCost: 15000, ownerIds: [1] },
        { id: 2, name: 'Conference Room Setup', description: 'Cost of setting up the shared conference room.', totalCost: 30000, ownerIds: [2, 3] },
        { id: 3, name: 'Project A', description: 'Expenses for Project A collaboration.', totalCost: 2000, ownerIds: [1, 2] }
      ];

      service.getOwnedPartyItems(mockPartyId).subscribe((items) => {
        expect(items).toContainEqual(mockItems[0]);
        expect(items).toContainEqual(mockItems[2]);
        expect(items).not.toContainEqual(mockItems[1]);
        done();
      });

      const req = httpMock.expectOne('assets/items.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockItems);

      httpMock.verify();
    });
  });

});
