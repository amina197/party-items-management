import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from '../../features/users/users/user';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const endpoint = 'assets/users.json';

  const mockLocalStorageService = {
    saveData: jest.fn(),
    loadData: jest.fn(),
  };

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@test.com',
      partyId: 101
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@test.com',
      partyId: 102
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserService,
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test setActiveUser and getActiveUser methods', () => {
    it('should set and get active user via BehaviorSubject', done => {
      service.setActiveUser(mockUsers[0]);

      service.getActiveUser().subscribe(user => {
        expect(user).toEqual(mockUsers[0]);
        done();
      });
    });
  });

  describe('Test getUsers method', () => {
    it('should call assets/users.json and initialize active user (if stored user is valid)', done => {
      mockLocalStorageService.loadData.mockReturnValue(mockUsers[1]);

      service.getUsers().subscribe(users => {
        expect(users).toEqual(mockUsers);

        expect(mockLocalStorageService.saveData).not.toHaveBeenCalledWith(
          'active_user',
          mockUsers[0]
        );

        service.getActiveUser().subscribe((active) => {
          expect(active).toEqual(mockUsers[1]);
          done();
        });
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should call assets/users.json and initialize active user to first if stored is invalid', done => {
      const invalidStoredUser: User = { id: 999, name: 'Ghost', email: 'ghost@test.com', partyId: 999 };
      mockLocalStorageService.loadData.mockReturnValue(invalidStoredUser);

      service.getUsers().subscribe(users => {
        expect(users).toEqual(mockUsers);

        expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(
          'active_user',
          mockUsers[0]
        );

        service.getActiveUser().subscribe(active => {
          expect(active).toEqual(mockUsers[0]);
          done();
        });
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should handle error when getUsers fails', done => {
      service.getUsers().subscribe({
        next: () => {
          fail('Should have errored');
        },
        error: (err) => {
          expect(err.message).toContain('Error initializing items:');
          done();
        },
      });

      const req = httpMock.expectOne(endpoint);
      req.error(new ProgressEvent('Network error'));
    });
  });
});
