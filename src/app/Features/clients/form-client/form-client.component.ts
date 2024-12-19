import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../client.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, NgIf],
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css'],
})
export class FormClientComponent implements OnInit {
  clientForm: FormGroup;
  submitted = false; // Track submission state
  private readonly route = inject(ActivatedRoute);

  private readonly toast = inject(ToastrService);
  private readonly clientsService = inject(ClientService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize form group here
    this.clientForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchClientData(id);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
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

  private fetchClientData(id: string): void {
    this.clientsService.getClientById(Number(id)).subscribe(
      data => {
        this.clientForm.patchValue(data);
      },
      err => {
        this.toast.error('Failed to fetch client data');
        console.error(err);
      }
    );
  }

  onSubmit() {
    this.submitted = true; // Set submitted flag to true

    if (this.clientForm.valid) {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.clientsService.UpdateClient(id, this.clientForm.value).subscribe(
            response => {
              this.toast.success('Create successfully');
              this.clientForm.reset(); // Optionally reset the form
              this.submitted = false; // Reset submitted state if needed
            },
            err => {
              const { error } = err;
              this.toast.error(error.error.message);
            }
          );
        } else {
          this.clientsService.CreateVehicle(this.clientForm.value).subscribe(
            response => {
              this.toast.success('Create successfully');
              this.clientForm.reset(); // Optionally reset the form
              this.submitted = false; // Reset submitted state if needed
            },
            err => {
              const { error } = err;
              this.toast.error(error.error.message);
            }
          );
        }
      });
    }
  }
}
