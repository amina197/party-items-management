import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ComponentRef } from '@angular/core';
import { User } from '../../../features/users/users/user';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let componentRef: ComponentRef<SidebarComponent>;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('activeUser', {} as User);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
