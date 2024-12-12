import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoUpdaComponent } from './producto-upda.component';

describe('ProductoUpdaComponent', () => {
  let component: ProductoUpdaComponent;
  let fixture: ComponentFixture<ProductoUpdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoUpdaComponent]
    });
    fixture = TestBed.createComponent(ProductoUpdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
