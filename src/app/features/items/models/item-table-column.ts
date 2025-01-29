
import { TableColumn } from '../../../shared/models/table/table-column';
import { PartyItem } from './party-item';

export class ItemTableColumn implements TableColumn {
  field: keyof PartyItem;
  label: string;
  width?: string;
  minWidth?: string;

  constructor(field: keyof PartyItem, label: string, width?: string, minWidth?: string) {
    this.field = field;
    this.label = label;
    this.width = width;
    this.minWidth = minWidth;
  }
}
