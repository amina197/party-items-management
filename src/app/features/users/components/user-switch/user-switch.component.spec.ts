import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSwitchComponent } from './user-switch.component';
import { UserService } from '../../../../services/users/user.service';

describe('UserSwitchComponent', () => {
  let component: UserSwitchComponent;
  let fixture: ComponentFixture<UserSwitchComponent>;
  let mockUserService: Partial<UserService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSwitchComponent],
      providers: [
        {provide: UserService, useValue: mockUserService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
