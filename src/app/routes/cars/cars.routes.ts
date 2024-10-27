import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { FormComponent } from './form/form.component';
import { IndexCarsComponent } from './index-cars/index-cars.component';
import { CreateCarsComponent } from './create-cars/create-cars.component';
import { DetailsCarComponent } from './details-car/details-car.component';
import { BrandsComponent } from '../brands/brands.component';

export const routes: Routes = [
  { path: '', component: IndexCarsComponent },
  { path: 'create', component: CreateCarsComponent },
  { path: 'update/:id', component: CreateCarsComponent },
  { path: 'details/:id', component: DetailsCarComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'add-car', component: FormComponent },
  { path: 'brands', component: BrandsComponent },
];
