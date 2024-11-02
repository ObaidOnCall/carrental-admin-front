import { Component } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { FormClientComponent } from 'app/Features/clients/form-client/form-client.component';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [PageHeaderComponent, FormClientComponent],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css',
})
export class CreateClientComponent {}
