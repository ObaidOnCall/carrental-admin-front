import { Component } from '@angular/core';
import { TableClientComponent } from 'app/Features/clients/table-client/table-client.component';

@Component({
  selector: 'app-index-client',
  standalone: true,
  imports: [TableClientComponent],
  templateUrl: './index-client.component.html',
  styleUrl: './index-client.component.css',
})
export class IndexClientComponent {}
