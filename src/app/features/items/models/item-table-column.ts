
import { TableColumn } from '../../../shared/models/table/table-column';
import { PartyItem } from './party-item';

export class ItemTableColumn implements TableColumn {
  field: keyof PartyItem;
  label: string;
  width?: string;

  constructor(field: keyof PartyItem, label: string, width?: string) {
    this.field = field;
    this.label = label;
    this.width = width;
  }
}
