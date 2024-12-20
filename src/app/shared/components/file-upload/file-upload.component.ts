import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    FormsModule ,
    ReactiveFormsModule ,
    CommonModule ,
    TranslateModule ,
    MatButtonModule ,
    MatDialogModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Inject(MAT_DIALOG_DATA) public data: any ;

  uploadForm: FormGroup;
  uploadedFiles: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FileUploadComponent>
  ) {

    this.uploadForm = new FormGroup({
      files: new FormControl(null, [Validators.required])
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
    this.uploadedFiles = [] ;
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input?.files) {
      this.uploadedFiles = Array.from(input.files);
    }

    console.warn(this.uploadedFiles);
  }

  onSubmit() {


    if (this.uploadForm.valid) {
          
      if (this.data.onSubmit) {
        this.data.onSubmit(this.uploadedFiles);
      }
      this.dialogRef.close();
      
    
    } else {

      this.uploadForm.markAllAsTouched() ;
    }
  }
}
