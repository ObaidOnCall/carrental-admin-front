import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { DeleteDialogComponent } from 'app/Features/common/delete-dialog/delete-dialog.component';
import { Table, TableModule } from 'primeng/table';
import { ClientService } from '../client.service';
import {ClientResponse, PaginatedClientResponse } from '../clientTypes';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TripTreesComponent } from '@shared/components/loaders/trip-trees/trip-trees.component';
import { PageEvent } from '@angular/material/paginator';
import { FiltersType } from 'app/Features/cars/types';

@Component({
  selector: 'app-table-client',
  standalone: true,
  imports: [
    CommonModule ,
    TableModule,
    DeleteDialogComponent,
    MtxGridModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    TagModule ,
    ButtonModule , InputIconModule , IconFieldModule , MultiSelectModule , InputTextModule ,
    DropdownModule , SliderModule , ProgressBarModule,
    TripTreesComponent
  ],
  templateUrl: './table-client.component.html',
  styleUrl: './table-client.component.css',
  providers: [MtxGridModule],
})
export class TableClientComponent {
  
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  private readonly toast = inject(ToastrService);
  private readonly router: Router= inject(Router)
  private clientUpdateSub: Subscription | undefined;
  private readonly clientService : ClientService = inject(ClientService) ;

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('Firstname'),
      field: 'firstname',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Lastname'),
      field: 'lastname',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Cin/Passport'),
      field: 'cinOrPassport',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Licence'),
      field: 'licence',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Nationality'),
      field: 'nationality',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Address'),
      field: 'mileage',
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Ville'),
      field: 'ville',
      minWidth: 100,
    },
    {
      header: this.translate.stream('CodePostal'),
      field: 'codePostal',
      minWidth: 100,
    },
    {
      header: this.translate.stream('Phone'),
      field: 'phone1',
      minWidth: 180,
    },
    {
      header: this.translate.stream('Phone 2'),
      field: 'fuelEfficiency',
      minWidth: 180,
    },
    {
      header: this.translate.stream('Email'),
      field: 'email',
      minWidth: 180,
      sortable:true
    },
    {
      header: this.translate.stream('Cin Valide Until'),
      field: 'cinIsValideUntil',
      minWidth: 180,
      sortable:true
    },
    {
      header: this.translate.stream('Licence Valide Until'),
      field: 'licenceIsValideUntil',
      minWidth: 180,
      sortable:true
    },
    {
      header: this.translate.stream('Client Type'),
      field: 'clientType',
      minWidth: 180,
      sortable:true
    },

    {
      header: this.translate.stream('operation'),
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
          tooltip: this.translate.stream('edit'),
          // click: car => this.router.navigate(['/cars/update', car.id]),
          click : vehicle => this.updateVehicle(vehicle.id)
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: vehicle => this.handelDelete(vehicle.id),
        },
        {
          type: 'icon',
          color: 'primary',
          icon: 'arrow_right_alt',
          tooltip: this.translate.stream('details'),
          click: car => this.router.navigate(['/cars/details', car.id]),
        },
      ],
    },
  ];

  clients: ClientResponse[] = [];
  isLoading = true;
  totalRecords: number = 0;
  searchTerm: string = '';
  ListRowSelectable: any[] = [];
  selectedView: string = 'table';
  selectedIds: number[] = [];


  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  
  filters: FiltersType = {
    curentPage: 0,
    rows: 10,
  };


  constructor() {} ;

  ngOnInit() { 

    this.getClients(this.filters) ;
  }
  


  getClients(filters: FiltersType) : void {
    this.isLoading = true ;

    this.clientService.getClients(filters.curentPage , filters.rows).subscribe({

      next : (pageClientResponse:PaginatedClientResponse) => {
        this.clients = pageClientResponse.content ;
        this.totalRecords = pageClientResponse.totalElements;
      } ,
    }) ;

    this.isLoading = false;
  }


  handelPagination(e: PageEvent) {
    this.filters = { rows: e.pageSize, curentPage: e.pageIndex };
    this.getClients(this.filters);
  }


  onSelectionChange(event:any) {
    this.selectedIds = event.map((row: { id: number }) => row.id);
  }

  
  handelDelete(id: any): void {
    throw new Error('Method not implemented.');
  }
  updateVehicle(id: any): void {
    throw new Error('Method not implemented.');
  }
}
