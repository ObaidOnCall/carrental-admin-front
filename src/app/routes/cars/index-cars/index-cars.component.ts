import { Component } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { TableCarsComponent } from 'app/Features/cars/table-cars/table-cars.component';

@Component({
  selector: 'app-index-cars',
  standalone: true,
  imports: [TableCarsComponent, PageHeaderComponent],
  templateUrl: './index-cars.component.html',
  styleUrl: './index-cars.component.css',
})
export class IndexCarsComponent {}
