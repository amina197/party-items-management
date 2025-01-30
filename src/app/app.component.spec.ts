import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/users/user.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from './features/users/users/user';
import { OwnersService } from './services/owners.service';
import { Owner } from './features/owners/models/owner';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let mockUserService: jest.Mocked<Partial<UserService>>;
  let mockOwnerService: jest.Mocked<Partial<OwnersService>>;

  const users: User[] = [
    { id: 1, name: 'John Snow', email: 'john.snow@gmail.com', partyId: 1 },
    { id: 2, name: 'Tom Hanks', email: 'tom.hanks@outlook.com', partyId: 2 }
  ] as User[];

  const owners: Owner[] = [
    { id: 1, name: 'Party 1' },
    { id: 2, name: 'Party 2' }
  ] as Owner[];

  beforeEach(async () => {
    mockUserService = {
      getUsers: jest.fn().mockReturnValue(of(users)),
      getActiveUser: jest.fn().mockReturnValue(of(users[0]))
    };

    mockOwnerService = {
      getOwners: jest.fn().mockReturnValue(of(owners))
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: mockUserService },
        { provide: OwnersService, useValue: mockOwnerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => jest.resetAllMocks());

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnInit method', () => {
    beforeEach(() => component.ngOnInit());

    it('should call getOwners on initialization', () => {
      expect(mockOwnerService.getOwners).toHaveBeenCalledTimes(1);
    });

    it('should load and set users', () => {
      expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
      expect(component.users).toEqual(users);
    });

    it('should set active user', () => {
      expect(mockUserService.getActiveUser).toHaveBeenCalledTimes(1);
      expect(component.activeUser()).toEqual(users[0]);
    });

    it('should set isInitializing to false after loading', () => {
      expect(component.isInitializing()).toBe(false);
    });
  });

});