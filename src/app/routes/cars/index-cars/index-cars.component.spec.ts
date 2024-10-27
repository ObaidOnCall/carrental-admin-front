import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCarsComponent } from './index-cars.component';

describe('IndexCarsComponent', () => {
  let component: IndexCarsComponent;
  let fixture: ComponentFixture<IndexCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
