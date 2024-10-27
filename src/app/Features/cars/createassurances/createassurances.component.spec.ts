import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateassurancesComponent } from './createassurances.component';

describe('CreateassurancesComponent', () => {
  let component: CreateassurancesComponent;
  let fixture: ComponentFixture<CreateassurancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateassurancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateassurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
