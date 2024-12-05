import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsBottonComponent } from './docs-botton.component';

describe('DocsBottonComponent', () => {
  let component: DocsBottonComponent;
  let fixture: ComponentFixture<DocsBottonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsBottonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
