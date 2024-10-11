import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from './components/form/form.component';
import { ListCatalogComponent } from './components/list-catalog/list-catalog.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    ListCatalogComponent,
    FormComponent,
    MatIconModule,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent { 
  selectedTabIndex = 0; 
  selectedContact: any;

  onTabChange(event: { index: number, contact: any }) {
    console.log(event);
    this.selectedTabIndex = event.index; 
    if (event.contact) {
      this.selectedContact = event.contact; 
    }
  }
}
