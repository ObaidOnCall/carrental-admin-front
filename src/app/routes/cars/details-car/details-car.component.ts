import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsServiceService } from 'app/Features/cars/cars-service.service';
import { CarType } from 'app/Features/cars/types';
import { GalleriaModule } from 'primeng/galleria';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { CarResponse } from '../car';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ImageViewerComponent } from '@shared/components/image-viewer/image-viewer.component';
import { ShareBottonComponent } from '@shared/components/share-botton/share-botton.component';
import { DocsBottonComponent } from '@shared/components/docs-botton/docs-botton.component';
import { FileManagerComponent } from '@shared/components/file-manager/file-manager.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details-car',
  standalone: true,
  imports: [
    GalleriaModule,
    MatIconModule,
    MatCardModule,
    PageHeaderComponent ,
    MatDividerModule ,
    MatButtonModule ,
    ImageViewerComponent ,
    ShareBottonComponent ,
    DocsBottonComponent ,
    FileManagerComponent ,
    TranslateModule
  ],
  templateUrl: './details-car.component.html',
  styleUrls: ['./details-car.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DetailsCarComponent {
  images: any[] = [];
  id: string | null = null;
  car: CarResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsServiceService,
    public router: Router
  ) {}

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3 },
    { breakpoint: '768px', numVisible: 2 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  ngOnInit() {
    this.images = [
      {
        source: 'https://i.pinimg.com/564x/3f/df/8f/3fdf8f6def1440a98f0670c548704ccd.jpg',
        alt: 'Description 1',
        title: 'Image 1',
      },
      {
        source: 'https://i.pinimg.com/736x/2e/40/02/2e40027b9b156589cfbccbf7b33d3bc7.jpg',
        alt: 'Description 2',
        title: 'Image 2',
      },
      {
        source: 'https://i.pinimg.com/236x/d9/5c/d0/d95cd04d85043401df2b957eeba934cd.jpg',
        alt: 'Description 3',
        title: 'Image 3',
      },
    ];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.carsService.getCarById(Number(this.id)).subscribe(data => {
        this.car = data;
      });
    }
  }

  handelDelete(id: number) {
    this.carsService.deleteCars(id).subscribe({
      next: () => {
        console.log('deleted');
        this.router.navigate(['/cars']);
      },
      error: err => {
        console.error('Delete failed', err);
        this.router.navigate(['/cars']);
      },
    });
  }
}
