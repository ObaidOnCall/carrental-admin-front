import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule , ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
import { CarModel, CarRequest, CarType, FiltersType } from '../types';
import { CarsServiceService } from '../cars-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { ShareBottonComponent } from '@shared/components/share-botton/share-botton.component';
import { TableToolbarComponent } from '@shared/components/table-toolbar/table-toolbar.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'app/Features/brands/services/brands.service';
import { Brand } from 'app/Features/brands/types/type';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-table-cars',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    MatButtonToggleModule,
    ShareBottonComponent ,
    TableToolbarComponent
],
  templateUrl: './table-cars.component.html',
  styleUrl: './table-cars.component.scss',
})
export class TableCarsComponent {
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  constructor(
    private carsService: CarsServiceService,
    private router: Router 
  ) {}

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('Matricule'),
      field: 'matricule',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Color'),
      field: 'color',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Brand'),
      field: 'brandName',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Model'),
      field: 'modelName',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Fuel Type'),
      field: 'fuelType',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Mileage'),
      field: 'mileage',
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Price'),
      field: 'price',
      minWidth: 180,
    },
    {
      header: this.translate.stream('Doors'),
      field: 'numberOfDoors',
      minWidth: 180,
    },
    {
      header: this.translate.stream('Top Speed'),
      field: 'topSpeed',
      minWidth: 180,
    },
    {
      header: this.translate.stream('Fuel Efficiency'),
      field: 'fuelEfficiency',
      minWidth: 180,
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
          click: car => this.router.navigate(['/cars/update', car.id]),
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

  cars: any[] = [];
  isLoading = true;
  totalRecords: number = 0;
  searchTerm: string = '';
  ListRowSelectable: any[] = [];
  selectedView: string = 'table';

  filters: FiltersType = {
    curentPage: 0,
    rows: 10,
  };

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

  fetchCars(filters: FiltersType): void {
    this.isLoading = true;
    this.carsService.getCars(filters.curentPage, filters.rows).subscribe(res => {
      this.totalRecords = res.totalElements;
      this.cars = res.content
        .filter(
          (item: any) =>
            !this.searchTerm || item.matricule.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .map((car: any) => {
          return {
            ...car,
            matricule: car.matricule.charAt(0).toUpperCase() + car.matricule.slice(1).toLowerCase(),
            // color: car.color.charAt(0).toUpperCase() + car.color.slice(1).toLowerCase(),
            modelName:
              car.model.name.charAt(0).toUpperCase() + car.model.name.slice(1).toLowerCase(),
            brandName:
              car.model.brand.name.charAt(0).toUpperCase() +
              car.model.brand.name.slice(1).toLowerCase(),
            fuelType: car.model.fuelType,
            numberOfDoors: car.model.numberOfDoors,
            topSpeed: car.model.topSpeed,
            fuelEfficiency: car.model.fuelEfficiency,
          };
        });
      this.isLoading = false;
    });
  }

  onSelectionChange() {
    console.log(this.ListRowSelectable);
  }

  handleSearch(): void {
    this.filters.curentPage = 0;
    setTimeout(() => {
      this.fetchCars(this.filters);
    }, 1000);
  }

  onViewChange(event: any) {
    this.selectedView = event.value; // Mettre à jour la valeur sélectionnée
    console.log('Font Style:', this.selectedView); // Imprimer la valeur
  }

  handelDelete(id: number) {
    this.carsService.deleteCars(id).subscribe({
      next: () => {
        console.log('deleted');
        this.fetchCars(this.filters);
      },
      error: err => {
        this.fetchCars(this.filters);
        console.error('Delete failed', err);
      },
    });
  }

  handelPagination(e: PageEvent) {
    this.filters = { rows: e.pageSize, curentPage: e.pageIndex };
    this.fetchCars(this.filters);
  }

  ngOnInit() {
    this.fetchCars(this.filters);
  }



  handelToolboxDeletetion () : void {
    console.warn("I'm deleting 💵");
    
  }



  handelToolboxAdd = (): void => {
    // console.warn(this.dialog);

    const dialogRef = this.dialog.originalOpen(FormComponent, {
      width: '900px',
      data: { name: 'nzbin', animal: 'panda' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  handelToolboxSearch(query : string) :void {

    console.warn(query);
    
  }



















  
}



@Component({
  selector: 'form-overview',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule ,
    ReactiveFormsModule,
    CommonModule ,
    TranslateModule
  ],
})
export class FormComponent {
  registerForm: FormGroup;

  private readonly brandService : BrandsService = inject(BrandsService) ;
  private readonly carService : CarsServiceService = inject(CarsServiceService) ;
  private readonly toast = inject(ToastrService);
  private readonly translate = inject(TranslateService);


  brands : Brand[] = [] ;
  models : CarModel [] = [] ;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.registerForm = new FormGroup({
      matricule: new FormControl('', [Validators.required]),
      // color: new FormControl('', [Validators.required]),
      date: new FormControl('2024-12-31', [Validators.required]),
      price: new FormControl('', [
        Validators.required, 
        Validators.min(5) ,
        Validators.max(1000) ,
      ]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.getBrands() ;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  onBrandChange(event : Event):void {
    const selectedBrandId = parseInt((event.target as HTMLSelectElement).value, 10);

    if (!selectedBrandId) {
      return;
    }

    this.getBrandModels(selectedBrandId) ;
  }


  onSubmit() {
    
    if (this.registerForm.valid) {
      
      const formValue = this.registerForm.value;

      const carData: CarRequest = {
        matricule: formValue.matricule,
        year: new Date(formValue.date).getTime() / 1000,
        model: parseInt(formValue.model),
        color: formValue.color,
        mileage: 228687,
        price: formValue.price
      };

      this.carService.createVehicule([carData])
                      .subscribe({
                        next:(cars)=>{
                          const matricules = cars.map(car => car.matricule).join(', ');
                          this.translate.stream('VEHICLE_CREATED', { matricules }).subscribe((translatedMessage: string) => {
                            this.toast.success(translatedMessage);
                          });
                        } ,
                        error:()=>{

                        } ,
                        complete:()=>{
                          this.dialogRef.close();
                        }
                      })
      console.warn(carData);
      console.warn("Form is Valid");

    } else {
      this.registerForm.markAllAsTouched() ;
      console.warn("Form is not Valid");
      
    }
    
  }
  
  private getBrands() {
      this.brandService.getBrands()
      .subscribe(
        (brands : Brand[])=>{
          this.brands = brands ;
        }
      )
  }

  private getBrandModels(selectedBrandId : number) {

    this.brandService.getModels(selectedBrandId)
        .subscribe({

          next : (models : CarModel[])=> {
              this.models = models ;
          } ,

          error:()=> {

          } ,


          complete : ()=>{

          }
    })
  }
}