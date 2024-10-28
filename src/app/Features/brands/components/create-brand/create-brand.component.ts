import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../types/type';
import { FloatLabelModule } from 'primeng/floatlabel';
import { VehicleType } from 'app/Features/Vehicles/type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import MAT_DIALOG_DATA

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, CommonModule, FloatLabelModule],
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css'],
})
export class CreateBrandComponent implements OnInit {
  formCreateBrand!: FormGroup;
  submitted = false;
  brand: Brand | null = null;
  @Output() brandCreated = new EventEmitter<void>();
  vehicle: VehicleType | null = null;

  constructor(
    private fb: FormBuilder,
    private brandsService: BrandsService,
    @Inject(MAT_DIALOG_DATA) public data: { brandId: number | null },
    private dialogRef: MatDialogRef<CreateBrandComponent>
  ) {}

  ngOnInit(): void {
    this.formCreateBrand = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      countryOfOrigin: ['', Validators.required],
      parentCompany: ['', Validators.required],
      website: ['', Validators.required],
    });

    if (this.data.brandId) {
      // Use this.data.brandId instead of this.brandId
      this.brandsService.getBrandById(this.data.brandId).subscribe(data => {
        this.brand = data;
        this.formCreateBrand.patchValue(this.brand);
      });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    if (this.formCreateBrand.invalid) {
      return;
    }

    if (this.data.brandId) {
      this.brandsService.updateBrands([this.formCreateBrand.value], [this.data.brandId]).subscribe({
        next: res => {
          this.brandCreated.emit();
          this.dialogRef.close();
        },
        error: err => {
          console.error('Error Update brand', err);
        },
      });
    } else {
      this.brandsService.createBrands([this.formCreateBrand.value]).subscribe({
        next: response => {
          this.brandCreated.emit();
          this.dialogRef.close();
        },
        error: err => {
          console.error('Error creating brand', err);
        },
      });
    }
  }

  get f() {
    return this.formCreateBrand.controls;
  }
}
