import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { PartyItem } from '../../../items/models/party-item';

@Component({
  selector: 'app-proposal-history',
  imports: [NgClass],
  templateUrl: './proposal-history.component.html',
  styleUrl: './proposal-history.component.scss'
})
export class ProposalHistoryComponent {

  item = input.required<PartyItem>();
  proposals = computed(() => this.item().proposals);

}
