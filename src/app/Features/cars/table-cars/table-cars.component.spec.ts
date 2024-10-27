import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCarsComponent } from './table-cars.component';

describe('TableCarsComponent', () => {
  let component: TableCarsComponent;
  let fixture: ComponentFixture<TableCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
