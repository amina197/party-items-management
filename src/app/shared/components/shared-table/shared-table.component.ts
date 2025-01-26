import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { RowData } from '../../models/table/row-data';
import { TableColumn } from '../../models/table/table-column';

@Component({
  selector: 'app-shared-table',
  imports: [],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss'
})
export class SharedTableComponent {

  columns: InputSignal<TableColumn[]> = input.required();
}
