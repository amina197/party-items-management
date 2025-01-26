import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-card',
  imports: [],
  templateUrl: './shared-card.component.html',
  styleUrl: './shared-card.component.scss'
})
export class SharedCardComponent {

  @Input({ required: true }) title: string = '';
}
