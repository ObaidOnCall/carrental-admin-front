import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '@shared';
import { FormCreateCarsComponent } from 'app/Features/cars/form-create-cars/form-create-cars.component';

@Component({
  selector: 'app-create-cars',
  standalone: true,
  imports: [PageHeaderComponent, FormCreateCarsComponent, MatCardModule],
  templateUrl: './create-cars.component.html',
  styleUrl: './create-cars.component.css',
})
export class CreateCarsComponent {}
