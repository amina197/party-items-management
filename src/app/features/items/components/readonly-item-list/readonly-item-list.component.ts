import { Component, OnInit } from '@angular/core';
import { AbstractItemListComponent } from '../abstract-item-list/abstract-item-list.component';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { SharedTableComponent } from '../../../../shared/components/shared-table/shared-table.component';

@Component({
  selector: 'app-readonly-item-list',
  imports: [SharedTableComponent],
  templateUrl: '../abstract-item-list/abstract-item-list.component.html',
  styleUrl: '../abstract-item-list/abstract-item-list.component.scss'
})
export class ReadonlyItemListComponent extends AbstractItemListComponent implements OnInit {
  override ngOnInit(): void {
    this.statuses = [
      StatusEnum.OWNED,
      StatusEnum.FINALIZED
    ];

    super.ngOnInit();
  }

}
