import { Component } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../types/type';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CreateBrandComponent } from '../create-brand/create-brand.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-table-brands',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MtxGridModule,
    CreateBrandComponent,
    SidebarModule,
    ButtonModule,
  ],
  templateUrl: './table-brands.component.html',
  styleUrl: './table-brands.component.css',
})
export class TableBrandsComponent {
  brands: Brand[] = [];
  columns: MtxGridColumn[] = [
    { header: 'Brand Name', field: 'name', sortable: true, minWidth: 100, width: '150px' },
    { header: 'Country', field: 'country', sortable: true, minWidth: 100, width: '150px' },
    {
      header: 'Established Year',
      field: 'establishedYear',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: 'Operation',
      field: 'operation',
      minWidth: 160,
      width: '160px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          color: 'accent',
          icon: 'edit',
          tooltip: 'Edit',
          click: brand => this.openDialog(brand.id), // Open dialog for editing brand
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: 'Delete',
          pop: {
            title: 'Confirm delete?',
            closeText: 'Close',
            okText: 'OK',
          },
          click: brand => this.handleDelete(brand.id), // Handle delete operation
        },
      ],
    },
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private brandsService: BrandsService
  ) {}

  ngOnInit() {
    this.fetchBrands();
  }

  fetchBrands() {
    this.brandsService.getBrands().subscribe((brands: Brand[]) => {
      this.brands = brands && brands;
      // Update your data table with the fetched brands
      // Example: this.dataSource = brands;
    });
  }

  openDialog(id: number | null) {
    const dialogRef = this.dialog.open(CreateBrandComponent, {
      data: { brandId: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchBrands();
    });
  }

  handleDelete(id: number) {
    // Implement the deletion logic here
    // this.brandsService.deleteBrand(id).subscribe(() => {
    //   this.fetchBrands(); // Refresh the list after deletion
    // });
  }
}
