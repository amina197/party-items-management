import { TestBed } from '@angular/core/testing';

import { OwnersService } from './owners.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('OwnersService', () => {
  let service: OwnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(OwnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
