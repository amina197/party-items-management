import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailSidePanelComponent } from './item-detail-side-panel.component';

describe('ItemDetailSidePanelComponent', () => {
  let component: ItemDetailSidePanelComponent;
  let fixture: ComponentFixture<ItemDetailSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailSidePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
