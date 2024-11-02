import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { DeleteDialogComponent } from 'app/Features/common/delete-dialog/delete-dialog.component';
import { TableModule } from 'primeng/table';
import { ClientServiceService } from '../client-service.service';
import { Client } from '../types';

@Component({
  selector: 'app-table-client',
  standalone: true,
  imports: [
    TableModule,
    DeleteDialogComponent,
    MtxGridModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
  ],
  templateUrl: './table-client.component.html',
  styleUrl: './table-client.component.css',
  providers: [MtxGridModule],
})
export class TableClientComponent {
  constructor(private clientService: ClientServiceService) {}
  clients: Client[] = [];
  columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id' },
    { header: 'First Name', field: 'firstname' },
    { header: 'Last Name', field: 'lastname' },
    { header: 'CIN/Passport', field: 'cinOrPassport' },
    { header: 'Licence', field: 'licence' },
    { header: 'Nationality', field: 'nationality' },
    { header: 'Address', field: 'address' },
    { header: 'City', field: 'ville' },
    { header: 'Postal Code', field: 'codePostal' },
    { header: 'Phone 1', field: 'phone1' },
    { header: 'Phone 2', field: 'phone2' },
    { header: 'Email', field: 'email' },
    { header: 'CIN Valid Until', field: 'cinIsValideUntil', type: 'date' },
    { header: 'Licence Valid Until', field: 'licenceIsValideUntil', type: 'date' },
    { header: 'Client Type', field: 'clientType' },
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
          // Define edit function
        },
        {
          type: 'icon',
          text: 'delete',
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          pop: 'Confirm delete?',
          // Define delete function
        },
      ],
    },
  ];

  totalRecords = this.clients.length;
  rows = 5; // Default page size
  currentPage = 0;

  trackById(index: number, item: any) {
    return item.id;
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.rows = event.pageSize;
    // Handle pagination data fetching if needed
  }

  ngOnInit() {
    this.fetchBrands();
  }

  fetchBrands() {
    this.clientService.getClients(this.currentPage, this.rows).subscribe((clients: Client[]) => {
      this.clients = clients && clients;
      // Update your data table with the fetched brands
      // Example: this.dataSource = brands;
    });
  }

  handleDelete(id: number) {
    // Implement the deletion logic here
    // this.brandsService.deleteBrand(id).subscribe(() => {
    //   this.fetchBrands(); // Refresh the list after deletion
    // });
  }
}
