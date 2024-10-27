import { Routes } from '@angular/router';
import { BrandsComponent } from './brands.component';
import { CreateModelComponent } from './create-model/create-model.component';

export const routes: Routes = [
  { path: '', component: BrandsComponent },
  { path: 'createmodel', component: CreateModelComponent },
];
