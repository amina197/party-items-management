import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/users/user.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let mockUserService: Partial<UserService> = {
    getUsers: jest.fn(),
    getActiveUser: jest.fn()
  };

  const users = [
    {
      id: 1,
      name: 'John Snow',
      email: 'john.snow@gmail.com',
      partyId: 1
    },
    {
      id: 2,
      name: 'Tom Hanks',
      email: 'tom.hanks@outlook.com',
      partyId: 2
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    jest.spyOn(mockUserService, 'getUsers').mockReturnValueOnce(of(users));
    jest.spyOn(mockUserService, 'getActiveUser').mockReturnValueOnce(of(users[0]));

    fixture.detectChanges();
  });

  afterEach(() => jest.resetAllMocks());

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnInit method', () => {
    it('should load and set users', () => {
      expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
      expect(component.users).toEqual(users);
    });

    it('should set active user', () => {
      expect(mockUserService.getActiveUser).toHaveBeenCalledTimes(1);
      expect(component.activeUser()).toEqual(users[0]);
    });

    it('should set isInitializing to false', () => {
      expect(component.isInitializing()).toBe(false);
    });
  });

});
