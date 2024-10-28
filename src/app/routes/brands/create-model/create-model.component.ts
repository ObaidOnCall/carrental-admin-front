import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageHeaderComponent } from '@shared';
import { BrandsService } from 'app/Features/brands/services/brands.service';
import { Brand } from 'app/Features/brands/types/type';
import { ToastrService } from 'ngx-toastr';

interface OptionSelect {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create-model',
  standalone: true,
  imports: [
    PageHeaderComponent,
    FormsModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './create-model.component.html',
  styleUrl: './create-model.component.css',
})
export class CreateModelComponent {
  modelForm: FormGroup;
  brands: OptionSelect[] | null = null;
  private readonly toast = inject(ToastrService);

  constructor(
    private fb: FormBuilder,
    private brandServices: BrandsService
  ) {
    this.modelForm = this.fb.group({
      name: ['', Validators.required],
      topSpeed: ['', [Validators.required, Validators.min(0)]],
      numberOfDoors: ['', [Validators.required, Validators.min(1)]],
      brand: ['', Validators.required],
    });
  }

  fetchBrand() {
    this.brandServices.getBrands().subscribe(res => {
      this.brands = res.map((item: Brand) => ({ value: item.id, viewValue: item.name }));
    });
  }
  ngOnInit() {
    this.fetchBrand();
  }
  onSubmit() {
    if (this.modelForm.valid) {
      console.log([this.modelForm.value]);

      this.brandServices.createModel(this.modelForm.value).subscribe(
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
}
