import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSimpleComponent } from './producto-simple.component';

describe('ProductoSimpleComponent', () => {
  let component: ProductoSimpleComponent;
  let fixture: ComponentFixture<ProductoSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoSimpleComponent]
    });
    fixture = TestBed.createComponent(ProductoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
