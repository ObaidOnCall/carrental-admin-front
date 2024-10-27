import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CarsServiceService } from '../cars-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createassurances',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './createassurances.component.html',
  styleUrls: ['./createassurances.component.css'],
})
export class CreateassurancesComponent implements OnInit {
  assuranceForm: FormGroup;
  private readonly toast = inject(ToastrService);

  constructor(
    private fb: FormBuilder,
    private carsService: CarsServiceService
  ) {
    this.assuranceForm = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      expireDate: ['', Validators.required],
      price: [''],
      assuranceContact: [''],
      observation: [''],
      vehicle: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.assuranceForm.valid) {
      console.log(this.assuranceForm.value);
      this.carsService.CreateAssurance(this.assuranceForm.value).subscribe(
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
