import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoStatusComponent } from './producto-status.component';

describe('ProductoStatusComponent', () => {
  let component: ProductoStatusComponent;
  let fixture: ComponentFixture<ProductoStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoStatusComponent]
    });
    fixture = TestBed.createComponent(ProductoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
