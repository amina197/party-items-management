import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRequiredItemListComponent } from './action-required-item-list.component';

describe('ActionRequiredItemListComponent', () => {
  let component: ActionRequiredItemListComponent;
  let fixture: ComponentFixture<ActionRequiredItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionRequiredItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRequiredItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
