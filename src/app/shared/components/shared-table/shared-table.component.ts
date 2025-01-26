import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { TableColumn } from '../../models/table-column';
import { RowData } from '../../models/row-data';

@Component({
  selector: 'app-shared-table',
  imports: [],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss'
})
export class SharedTableComponent {

  data: InputSignal<RowData[]> = input.required();
  columns: InputSignal<TableColumn[]> = input.required();
}
