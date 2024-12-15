import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/service/productoService/producto.service';
import { MovimientoService } from 'src/app/service/movimientoService/movimiento.service';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { InventarioService } from 'src/app/service/inventarioService/inventario.service';
import { CustomValidators } from 'src/app/utils/validators';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-salida-producto',
  templateUrl: './salida-producto.component.html',
  styleUrls: ['./salida-producto.component.scss']
})
export class SalidaProductoComponent implements OnInit {

  productid = '';
  cantidad_up = '';
  number1 = ''; // cantidad actual
  number2 = 0; // cantidad form
  number3 = 0; // suma
  today = new Date();
  button = "salida";
  title = "registrar SALIDA";
  salidaForm: FormGroup | any;
  updateProVal: any = [];
  prods: any = [];
  users: any = [];
  curr_prod: any = [];  
  

  createFormGroup() {
    return new FormGroup({
      FechaInventario: new FormControl(this.today.toJSON().slice(0, 19).replace('T', ' ')),
      Cantidad: new FormControl('', [CustomValidators.onlyNumbers, Validators.required, Validators.minLength(1)]),
      UsuarioId: new FormControl('',[Validators.required]),
      ProductoId: new FormControl('',[Validators.required]),
      MovimientoId: new FormControl(2),
    });
  }

  constructor(private productoService: ProductoService,
              private movimientoService: MovimientoService,
              private usuarioService: UsuarioService,
              private inventarioService: InventarioService,
              private router: Router)
  {
    this.salidaForm = this.createFormGroup()
  }

  get Cantidad() {
    return this.salidaForm.get('Cantidad');
  }

  get UsuarioId() {
    return this.salidaForm.get('UsuarioId');
  }

  get ProductoId() {
    return this.salidaForm.get('ProductoId');
  }

  ngOnInit(){
    this.listProActive();
    this.listUser();
  }

async listProActive(){
  await this.productoService.getProductsActives().subscribe({
   next: prod =>{ this.prods = prod},
   error: err =>{console.log(err)}}
 );
}

async listUser(){
  await this.usuarioService.getAllUsersAlmacenistas().subscribe({
   next: user =>{ this.users = user},
   error: err =>{console.log(err)}}
 );
}

buttonSave(){
  if(this.salidaForm){
    this.productid = this.ProductoId.value;
    console.log(this.salidaForm.value)
    // Existencia producto
    this.inventarioService.getExistProd(this.productid).subscribe({
      next: data =>{this.curr_prod = String(Object.values(data[0]))   
        const numero1 = Number(this.curr_prod)
        console.log(numero1)
        const numero2 = Number(this.Cantidad.value)
        console.log(numero2)
        if(numero1 < numero2){
          Swal.fire({
            icon: 'error',
            title: 'Intentalo otra vez',
            text: 'No puedes sacar mas producto de lo existente!!!'
          })
        }
        else{
          this.number3 = Number(numero1)-Number(numero2);
          // this.updatePro(this.productid, this.number3);
          this.movimientoService.addInvetary(this.salidaForm.value).subscribe({
            next: (data) => (this.salidaForm.value = data),
            error: (err) => console.log(err)
          });          
        }
      },
      error: err =>{console.log(err)}
    });        
  }
}

  //Actualizar existencia del producto
  updatePro(productid: string, number3: number){
    const producto = {
      ExistenciaProducto: number3
    }
    this.productoService.updateProduct(productid, producto).subscribe({
      next: res=>(res),
      error: err=>(console.log(err))
    })
  }

}
