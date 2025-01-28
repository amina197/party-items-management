import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSwitchComponent } from './user-switch.component';

describe('UserSwitchComponent', () => {
  let component: UserSwitchComponent;
  let fixture: ComponentFixture<UserSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSwitchComponent]
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
