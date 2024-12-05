import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBottonComponent } from './share-botton.component';

describe('ShareBottonComponent', () => {
  let component: ShareBottonComponent;
  let fixture: ComponentFixture<ShareBottonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareBottonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
