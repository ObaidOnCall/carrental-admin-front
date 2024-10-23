import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

import { PageHeaderComponent } from '@shared';
import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';

import { CarService } from '../car.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedCarResponse } from '../car';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss' ,

  providers: [TablesDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
  ],
})
export class OverviewComponent {
  private readonly translate = inject(TranslateService);
  private readonly dataSrv = inject(TablesDataService);
  private readonly dialog = inject(MtxDialog);
  private readonly carService = inject(CarService)

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('Matricule'),
      field: 'matricule',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('color'),
      field: 'color',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('weight'),
      field: 'weight',
      minWidth: 100,
    },
    {
      header: this.translate.stream('symbol'),
      field: 'symbol',
      minWidth: 100,
    },
    {
      header: this.translate.stream('gender'),
      field: 'gender',
      minWidth: 100,
    },
    {
      header: this.translate.stream('mobile'),
      field: 'mobile',
      hide: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('tele'),
      field: 'tele',
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('birthday'),
      field: 'birthday',
      minWidth: 180,
    },
    {
      header: this.translate.stream('city'),
      field: 'city',
      minWidth: 120,
    },
    {
      header: this.translate.stream('address'),
      field: 'address',
      minWidth: 180,
      width: '200px',
    },
    {
      header: this.translate.stream('company'),
      field: 'company',
      minWidth: 120,
    },
    {
      header: this.translate.stream('website'),
      field: 'website',
      minWidth: 180,
    },
    {
      header: this.translate.stream('email'),
      field: 'email',
      minWidth: 180,
    },
    {
      header: this.translate.stream('operation'),
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: record => this.edit(record),
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
          click: record => this.delete(record),
        },
      ],
    },
  ];

  list: any[] = [];
  isLoading = true;
  total: number = 0 ;

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


  query = {
    q: 'user:nzbin',
    page: 0,
    per_page: 5,
  };

  ngOnInit() {
    this.getList(this.query.page ,this.query.per_page);
    // this.list = this.dataSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }


  getList(page : number , size : number){
    
    this.carService.getListOfCars(page , size).subscribe(
      (carsPaginate: PaginatedCarResponse) => {
        this.list = carsPaginate.content;
        this.query.page = carsPaginate.totalPages ;
        this.query.per_page = carsPaginate.size ;
        this.isLoading = false;
      }
    )
  }

  getNextPage(e: PageEvent) {
    this.getList(e.pageIndex , e.pageSize ) ;
  }
}
