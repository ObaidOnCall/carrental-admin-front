import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTreesComponent } from './trip-trees.component';

describe('TripTreesComponent', () => {
  let component: TripTreesComponent;
  let fixture: ComponentFixture<TripTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripTreesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
