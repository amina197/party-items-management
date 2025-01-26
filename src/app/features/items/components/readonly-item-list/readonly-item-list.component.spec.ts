import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyItemListComponent } from './readonly-item-list.component';

describe('ReadonlyItemListComponent', () => {
  let component: ReadonlyItemListComponent;
  let fixture: ComponentFixture<ReadonlyItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadonlyItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
