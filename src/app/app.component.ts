import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemManagementDashboardComponent } from './features/dashboard/components/item-management-dashboard/item-management-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ItemManagementDashboardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'party-items-management-app';
}
