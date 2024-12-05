import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { DeleteDialogComponent } from 'app/Features/common/delete-dialog/delete-dialog.component';
import { Table, TableModule } from 'primeng/table';
import { ClientServiceService } from '../client.service';
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
    DropdownModule , SliderModule , ProgressBarModule
  ],
  templateUrl: './table-client.component.html',
  styleUrl: './table-client.component.css',
  providers: [MtxGridModule],
})
export class TableClientComponent {
searchValue: any;
clear(_t16: Table) {
throw new Error('Method not implemented.');
}

  // clients: Client[] = [];



  private readonly clientService : ClientServiceService = inject(ClientServiceService) ;
  customers!: ClientResponse[];
  selectedCustomers!: ClientResponse[];
  representatives!: { name: string; image: string }[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  ngOnInit(): void {
    this.clientService.getClients(0 , 20)
                                        .subscribe(
                                          (clientspage : PaginatedClientResponse)=>{
                                            this.customers = clientspage.content ;
                                            this.loading = false;
                                            console.warn(this.customers);
                                          }
                                        ) ;
    
                                        
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }




  getSeverity(status: string): string | null {
    switch (status) {
      case 'unqualified':
        return 'danger';
  
      case 'qualified':
        return 'success';
  
      case 'new':
        return 'info';
  
      case 'negotiation':
        return 'warning';
  
      case 'renewal':
        return null;
  
      default:
        return 'unknown'; // Or any default value you want
    }
  }
  
  
}
