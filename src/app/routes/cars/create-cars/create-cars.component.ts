import { Component } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { FormCreateCarsComponent } from 'app/Features/cars/form-create-cars/form-create-cars.component';

@Component({
  selector: 'app-create-cars',
  standalone: true,
  imports: [PageHeaderComponent, FormCreateCarsComponent],
  templateUrl: './create-cars.component.html',
  styleUrl: './create-cars.component.css',
})
export class CreateCarsComponent {}
