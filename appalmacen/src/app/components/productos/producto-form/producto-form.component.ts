import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/service/productoService/producto.service';
import { CustomValidators } from 'src/app/utils/validators';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit {

  button = "agregar";
  title = "registrar producto";
  productForm: FormGroup | any;
  role_user = '';
  roles: any = [];
  option = [
    {value:true, key:'Activo'},
    {value:false, key:'Inactivo'}];

  createFormGroup() {
    return new FormGroup({
      NombreProducto: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      PrecioProducto: new FormControl('',[CustomValidators.onlyNumbers, Validators.required]),   
      EstatusProducto: new FormControl('',[Validators.required]), 
      ExistenciaProducto: new FormControl(0),
    });
  }

  constructor(private productoService: ProductoService,
    private router: Router)
  {
    this.productForm = this.createFormGroup()
  }

  get NombreProducto() {
    return this.productForm.get('NombreProducto');
  }

  get PrecioProducto() {
    return this.productForm.get('PrecioProducto');
  }

  get EstatusProducto() {
    return this.productForm.get('EstatusProducto');
  }

  ngOnInit(){  }

  buttonSave(){
    if (this.productForm) {
      this.productoService.saveProduct(this.productForm.value).subscribe({
        next: (data) => this.productForm.value = data,
        error: (err) => console.log(err)
        });        
      Swal.fire('Buen trabajo!', 'Producto Registrado!', 'success');
      this.router.navigate(['/listaProducto']);
      }
    return 'ok';
  }

}
