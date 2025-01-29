import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProposalComponent } from "../../../proposals/components/proposal/proposal.component";
import { User } from '../../../users/users/user';
import { ItemStatusEnum } from '../../models/item-status.enum';
import { PartyItem } from '../../models/party-item';

@Component({
  selector: 'app-item-detail-side-panel',
  imports: [ProposalComponent],
  templateUrl: './item-detail-side-panel.component.html',
  styleUrl: './item-detail-side-panel.component.scss'
})
export class ItemDetailSidePanelComponent {

  @Input({ required: true }) item!: PartyItem;
  @Input({ required: true }) activeUser!: User;

  @Output() closePanel = new EventEmitter<void>();

  onClose(): void {
    this.closePanel.emit();
  }

  protected readonly itemStatusEnum = ItemStatusEnum;
}
