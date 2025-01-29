import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRowDataComponent } from './item-row-data.component';

describe('ItemRowDataComponent', () => {
  let component: ItemRowDataComponent;
  let fixture: ComponentFixture<ItemRowDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemRowDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
