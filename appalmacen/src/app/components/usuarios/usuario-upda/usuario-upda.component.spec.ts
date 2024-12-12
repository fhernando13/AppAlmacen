import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUpdaComponent } from './usuario-upda.component';

describe('UsuarioUpdaComponent', () => {
  let component: UsuarioUpdaComponent;
  let fixture: ComponentFixture<UsuarioUpdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioUpdaComponent]
    });
    fixture = TestBed.createComponent(UsuarioUpdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
