import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateCarsComponent } from './form-create-cars.component';

describe('FormCreateCarsComponent', () => {
  let component: FormCreateCarsComponent;
  let fixture: ComponentFixture<FormCreateCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
