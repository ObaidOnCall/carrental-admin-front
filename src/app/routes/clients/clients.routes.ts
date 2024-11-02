import { Routes } from '@angular/router';
import { IndexClientComponent } from './index-client/index-client.component';
import { CreateClientComponent } from './create-client/create-client.component';

export const routes: Routes = [
  { path: '', component: IndexClientComponent },
  { path: 'create', component: CreateClientComponent },
];
