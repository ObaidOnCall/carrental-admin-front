import { Component, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarsServiceService } from '../cars-service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'app/Features/brands/types/type';
import { BrandsService } from 'app/Features/brands/services/brands.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { ActivatedRoute } from '@angular/router';

interface OptionSelect {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-form-create-cars',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QuillModule,
  ],
  templateUrl: './form-create-cars.component.html',
  styleUrl: './form-create-cars.component.css',
})
export class FormCreateCarsComponent {
  vehicleForm: FormGroup;
  vehicle: any = null;
  brands: OptionSelect[] | null = null;
  optionModel: OptionSelect[] | null = null;
  selectedBrand: number = 0;
  selectedModel: number | null = null;
  description: string = '';
  id: string | null = null;
  private readonly toast = inject(ToastrService);

  constructor(
    private fb: FormBuilder,
    private carsService: CarsServiceService,
    private brandServices: BrandsService,
    private route: ActivatedRoute
  ) {
    this.vehicleForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      cinOrPassport: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      licence: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      nationality: ['', [Validators.minLength(4), Validators.maxLength(40)]],
      address: ['', [Validators.minLength(8), Validators.maxLength(50)]],
      ville: [''],
      codePostal: [''],
      phone1: [''],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      cinIsValideUntil: [''],
      licenceIsValideUntil: [''],
      clientType: [''],
    });
  }

  onSubmit() {
    if (this.id) {
      this.carsService
        .UpdateCar(Number(this.id), {
          ...this.vehicleForm.value,
        })
        .subscribe(
          response => {
            this.toast.success(`update successfully`);
          },
          err => {
            const { error } = err;
            this.toast.error(error.error.message);
          }
        );
    } else {
      this.carsService
        .CreateVehicle({
          ...this.vehicleForm.value,
          model: this.selectedModel,
        })
        .subscribe(
          response => {
            this.toast.success(`create successfully`);
          },
          err => {
            const { error } = err;
            this.toast.error(error.error.message);
          }
        );
    }
  }

  fetchBrand() {
    this.brandServices.getBrands().subscribe(res => {
      this.brands = res.map((item: Brand) => ({ value: item.id, viewValue: item.name }));
    });
  }

  logDescription() {
    console.log('Description updated:', this.description);
  }

  onSelectionChange(event: MatSelectChange) {
    this.carsService.getModelsById(event.value).subscribe(res => {
      this.optionModel = res.map((item: Brand) => ({ value: 22, viewValue: item.name }));
    });
  }

  ngOnInit() {
    this.fetchBrand();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.carsService.getCarById(Number(this.id)).subscribe(data => {
        this.vehicle = data;
        this.vehicleForm.patchValue({
          matricule: this.vehicle?.matricule,
          model: 22,
          color: this.vehicle?.color,
          mileage: this.vehicle?.mileage,
          year: new Date(this.vehicle?.year),
          price: this.vehicle?.price,
        });
      });
    }
  }

  get f() {
    return this.vehicleForm.controls;
  }
}
