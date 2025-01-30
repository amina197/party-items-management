import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../../features/users/users/user';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { OwnersService } from '../owners.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const endpoint = 'assets/users.json';

  const mockLocalStorageService = {
    saveData: jest.fn(),
    loadData: jest.fn(),
  };

  const mockOwnerService = {
    getPersistentOwners: jest.fn().mockReturnValue([])
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
  ] as User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserService,
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: OwnersService, useValue: mockOwnerService }
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

  describe('Test setUsersParty method', () => {
    it('should set the user party when owners exist', () => {
      const mockOwners = [
        { id: 101, name: 'Party 101' },
        { id: 102, name: 'Party 102' }
      ];

      mockOwnerService.getPersistentOwners.mockReturnValue(mockOwners);

      service['setUsersParty'](mockUsers);

      expect(mockUsers[0].party).toEqual(mockOwners[0]);
      expect(mockUsers[1].party).toEqual(mockOwners[1]);
    });
  });

});