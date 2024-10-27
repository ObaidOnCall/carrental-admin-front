import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { TableModule } from 'primeng/table';
import { DeleteDialogComponent } from 'app/Features/common/delete-dialog/delete-dialog.component';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { VehicleType } from '../type';
import { CreateVehiclesComponent } from '../create-vehicles/create-vehicles.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-vehicles',
  standalone: true,
  imports: [TableModule, DeleteDialogComponent, MtxGridModule],
  templateUrl: './table-vehicles.component.html',
  styleUrls: ['./table-vehicles.component.css'],
  providers: [MtxGridModule],
})
export class TableVehiclesComponent {
  @Input() vehiclesData: any = null;
  @Output() fetchData = new EventEmitter<void>();
  @Output() updateSelectedVehicleId = new EventEmitter<number>();

  totalRecords: number = 0;
  rows: number = 5;
  currentPage: number = 0;

  showSidebar = false;
  constructor(
    private vehiclesService: VehiclesService,
    private snackBar: MatSnackBar
  ) {}

  columns: MtxGridColumn[] = [
    { header: 'Matricule', field: 'matricule' },
    { header: 'Model', field: 'model.name' },
    { header: 'Color', field: 'color' },
    { header: 'Top Speed', field: 'model.topSpeed' },
    { header: 'Price', field: 'price' },
    {
      header: 'Operation',
      field: 'operation',
      width: '180px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'edit',
          icon: 'edit',
          tooltip: 'Edit',
          click: vehicle => this.updateSelectedVehicleId.emit(vehicle.id),
        },
        {
          type: 'icon',
          text: 'delete',
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          pop: 'Confirm delete?',
          click: vehicle => this.handelDelete(vehicle.id),
        },
      ],
    },
  ];

  onPageChange(event: any): void {
    const page = event.pageIndex;
    this.currentPage = page;
    this.fetchData.emit();
    console.log(event);
  }

  handelDelete(id: number) {
    this.vehiclesService.deleteVehicles(id).subscribe({
      next: () => {
        console.log('deleted');
        this.fetchData.emit();
        this.snackBar.open('Vehicle deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      },
      error: err => {
        this.snackBar.open('Vehicle deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.fetchData.emit();

        console.error('Delete failed', err);
      },
    });
  }

  trackByName(index: number, item: any) {
    return item.name;
  }
}
