import { Component, Input } from '@angular/core';
import { ItemTableColumn } from '../../models/item-table-column';
import { PartyItem } from '../../models/party-item';
import { NgClass, NgStyle } from '@angular/common';
import { ItemStatusToClassPipe } from "../../pipes/item-status-to-class.pipe";

@Component({
  selector: 'app-item-row-data',
  imports: [NgClass, NgStyle, ItemStatusToClassPipe],
  templateUrl: './item-row-data.component.html',
  styleUrl: './item-row-data.component.scss'
})
export class ItemRowDataComponent {

  @Input({ required: true }) columns: ItemTableColumn[] = [];
  @Input({ required: true }) item!: PartyItem;
}
