import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedSharedItemListComponent } from './finalized-shared-item-list.component';

describe('FinalizedSharedItemsComponent', () => {
  let component: FinalizedSharedItemListComponent;
  let fixture: ComponentFixture<FinalizedSharedItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizedSharedItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizedSharedItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
