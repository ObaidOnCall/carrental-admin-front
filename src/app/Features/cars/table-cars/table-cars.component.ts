import { Component, ElementRef, Inject, OnInit, Renderer2, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule , ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
import { CarModel, CarRequest, CarResponse, CarType, FiltersType } from '../types';
import { CarsServiceService ,CarEventDrivenService} from '../cars-service.service';
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
import { EditorComponent } from '@shared/components/editor/editor.component';
import { AppSettings, SettingsService } from '@core';
import { Subscription } from 'rxjs';
import { TripTreesComponent } from '@shared/components/loaders/trip-trees/trip-trees.component';
import { toHTML } from 'ngx-editor';


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
    TableToolbarComponent ,
    TripTreesComponent
],
  templateUrl: './table-cars.component.html',
  styleUrl: './table-cars.component.scss',
})
export class TableCarsComponent {
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  private readonly toast = inject(ToastrService);
  // private readonly carsService = inject(CarsServiceService)
  private readonly router: Router= inject(Router)
  private readonly carEventDrivenService : CarEventDrivenService = inject(CarEventDrivenService) ;
  private carUpdateSubscription: Subscription | undefined;


  constructor(
    private carsService: CarsServiceService
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

  cars: CarResponse[] = [];
  isLoading = true;
  totalRecords: number = 0;
  searchTerm: string = '';
  ListRowSelectable: any[] = [];
  selectedView: string = 'table';
  selectedIds: number[] = [];

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

  onSelectionChange(event:any) {

    
    this.selectedIds = event.map((row: { id: number }) => row.id);
    
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
    this.carsService.deleteCars([id]).subscribe({
      next: () => {
        this.fetchCars(this.filters);
      },
      error: err => {
        this.fetchCars(this.filters);
      },
    });
  }

  handelPagination(e: PageEvent) {
    this.filters = { rows: e.pageSize, curentPage: e.pageIndex };
    this.fetchCars(this.filters);
  }

  ngOnInit() {
    this.fetchCars(this.filters);

    /**
     * @abstract
     */
    this.carUpdateSubscription = this.carEventDrivenService.carUpdates$.subscribe(updatedCar => {
      const carIndex = this.cars.findIndex(car => car.id === updatedCar.id);
      if (carIndex !== -1) {        
        this.cars[carIndex] = {
          ...this.cars[carIndex],
          ...updatedCar,
        };
      }
    });
  }

  ngOnDestroy() {
    if (this.carUpdateSubscription) {
      this.carUpdateSubscription.unsubscribe();
    }
  }


  handelToolboxDeletetion = (): void => {

    if (!this.selectedIds?.length) {

      this.translate.stream("PLEASE_SELECT_ITEMS").subscribe((translatedMessage:string)=>{
        this.toast.error(translatedMessage);
      })
      return;
    }

    this.carsService.deleteCars(this.selectedIds).subscribe({

      next:()=>{

        this.cars = this.cars.filter(car => !this.selectedIds.includes(car.id));

        this.selectedIds = [];

        this.toast.warning("vehs deleted");
      },
      error:()=>{

      },
      complete:()=>{

      }
    })
    
  }



  handelToolboxAdd = (): void => {

    const dialogRef = this.dialog.originalOpen(FormComponent, {
      width: '900px',
      data: { mode: "add"},   
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  };

  handelToolboxSearch(query : string) :void {

    console.warn(query);
    
  }


  updateVehicle(vehicleId : number) : void {

    
    const foundVehicle : CarResponse | undefined = this.cars.find(car => car.id === vehicleId);
      
    const dialogRef = this.dialog.originalOpen(FormComponent, {
      width: '900px',
      data: { mode: "update" , vehicle:foundVehicle},   
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    

  }



















  
}



@Component({
  selector: 'form-overview',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule ,
    ReactiveFormsModule,
    CommonModule ,
    TranslateModule ,
    EditorComponent
  ],
})
export class FormComponent {
  registerForm: FormGroup;

  private readonly brandService : BrandsService = inject(BrandsService) ;
  private readonly carService : CarsServiceService = inject(CarsServiceService) ;
  private readonly toast = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly settings = inject(SettingsService);
  private readonly carEventDrivenService : CarEventDrivenService = inject(CarEventDrivenService) ;
  notifySubscription = Subscription.EMPTY;


  brands : Brand[] = [] ;
  models : CarModel [] = [] ;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {
    
    this.registerForm = new FormGroup({
      matricule: new FormControl(data?.vehicle?.matricule || '', [Validators.required]),
      date: new FormControl(data?.vehicle?.date || '2001-12-31', [Validators.required]),
      price: new FormControl(data?.vehicle?.price || '', [
        Validators.required,
        Validators.min(5),
        Validators.max(10000),
      ]),
      brand: new FormControl(data?.vehicle?.model.brand.id || '', [Validators.required]),
      model: new FormControl(data?.vehicle?.model.id || '', [Validators.required]),
      editorContent: new FormControl(data?.vehicle?.description, [Validators.maxLength(250)]),
    });
  }


  ngOnInit(): void {
    
    
    this.getBrands();

    this.notifySubscription = this.settings.notify.subscribe(opts => {
      this.updateThemes(opts) ;
    });
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
        price: formValue.price ,
        description: toHTML(formValue.editorContent)
      };

      if (this.data.mode == "add") {
        
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
      }

      else if (this.data.mode == "update") {
        
        const changedData : Partial<CarRequest> = this.filterChangedFields(carData) ;

        this.carService.updateCar(
                          [this.data.vehicle.id] ,
                          changedData ,
                        )
                        .subscribe({
                          next:()=> {
                            const matricules = carData.matricule;

                            this.carEventDrivenService.emitCarUpdate({ id: this.data.vehicle.id, ...changedData }) ;

                            this.translate.stream('VEHICLE_UPDATED', { matricules }).subscribe((translatedMessage: string) => {
                              this.toast.info(translatedMessage);
                            });
                          },
                          error:(err)=>{
                          } ,
                          complete:()=>{
                            this.dialogRef.close();

                          }
                        })        


      }


    } else {
      this.registerForm.markAllAsTouched() ;
      
    }
    
  }
  
  /**
   * I will cache the brands in session cache aslo the models ☘️
   */
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


  private filterChangedFields(carRequest: CarRequest): Partial<CarRequest> {

    const changedFields: Partial<CarRequest> = {};

    if (this.data.vehicle) {
        if (this.data.vehicle.matricule !== carRequest.matricule) {
            changedFields.matricule = carRequest.matricule;
        }
        if (new Date(this.data.vehicle.year).getFullYear() !== new Date(carRequest.year).getFullYear()) {
            changedFields.year = carRequest.year;
        }
        if (this.data.vehicle.model.id !== carRequest.model) {
            changedFields.model = carRequest.model;
        }
        if (this.data.vehicle.price !== carRequest.price) {
            changedFields.price = carRequest.price;
        }
        if (this.data.vehicle.color !== carRequest.color) {
            changedFields.color = carRequest.color;
        }
        if (this.data.vehicle.mileage !== carRequest.mileage) {
            changedFields.mileage = carRequest.mileage;
        }
        if (this.data.vehicle.description !== carRequest.description) {
          changedFields.description = carRequest.description;
        }
    }

    Object.keys(changedFields).forEach(key => {
        if (changedFields[key as keyof CarRequest] === undefined) {
            delete changedFields[key as keyof CarRequest];
        }
    });

    return changedFields;
  }


  private updateThemes(opts : Partial<AppSettings>) {

    const selectElements = this.el.nativeElement.querySelectorAll('.select');
    
    // Loop through all selected elements and add/remove the 'select_dark' class
    selectElements.forEach((element: HTMLElement) => {
      if (opts.theme === 'dark') {
        this.renderer.addClass(element, 'select_dark');
      } else {
        this.renderer.removeClass(element, 'select_dark');
      }
    });

  }


  getFormControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  // getFormControl = (name: string) : FormControl => {
  //   return this.registerForm.get(name) as FormControl;
  // }
}