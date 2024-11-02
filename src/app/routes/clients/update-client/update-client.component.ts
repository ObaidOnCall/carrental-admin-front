import { Component } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { FormClientComponent } from 'app/Features/clients/form-client/form-client.component';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [PageHeaderComponent, FormClientComponent],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css',
})
export class UpdateClientComponent {}
