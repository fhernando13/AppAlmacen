import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/service/productoService/producto.service';
import { MovimientoService } from 'src/app/service/movimientoService/movimiento.service';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { InventarioService } from 'src/app/service/inventarioService/inventario.service';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-entrada-producto',
  templateUrl: './entrada-producto.component.html',
  styleUrls: ['./entrada-producto.component.scss']
})
export class EntradaProductoComponent implements OnInit {

  productid = '';
  cantidad_up = '';
  number1 = 0; // cantidad actual
  number2 = 0; // cantidad form
  number3 = 0; // suma
  today = new Date();
  button = "agregar";
  title = "registrar entrada";
  entradaForm: FormGroup | any;
  updateProVal: any = [];
  prods: any = [];
  moves: any = [];
  users: any = [];
  curr_prod: any = [];


    createFormGroup() {
      return new FormGroup({        
        FechaInventario: new FormControl(this.today.toISOString()),   
        Cantidad: new FormControl('', [Validators.required, Validators.minLength(1)]),
        UsuarioId: new FormControl(''), 
        ProductoId: new FormControl(''),
        MovimientoId: new FormControl(1),
      });
    }    
  
  constructor(private productoService: ProductoService,
              private movimientoService: MovimientoService,
              private usuarioService: UsuarioService,
              private inventarioService: InventarioService,
              private router: Router)
  {
    this.entradaForm = this.createFormGroup()
  }
  
  get Cantidad() {
    return this.entradaForm.get('Cantidad');
  }

  get UsuarioId() {
    return this.entradaForm.get('Usuario');
  }

  get ProductoId() {
    return this.entradaForm.get('ProductoId');
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
    await this.usuarioService.getUsersByRol("1").subscribe({
     next: user =>{ this.users = user},
     error: err =>{console.log(err)}}
   );
  } 

  

  buttonSave(){
    if(this.entradaForm){      
      this.productid = this.ProductoId.value; 
      // Existencia producto 
      this.inventarioService.getExistProd(this.productid).subscribe({
        next: res =>{this.curr_prod = res},
        error: err =>{console.log(err)},
        complete: () => {
                        this.number1 =  this.curr_prod,
                        this.number2 = this.Cantidad.value,
                        this.number3 = Number(this.number1)+Number(this.number2)   
                        this.updatePro(this.productid, this.number3); 
                        this.insertEntry();
                        }                      
      })                   
    }
  }

  // Insertar entrada 
  insertEntry(){
    this.movimientoService.addInvetary(this.entradaForm.value).subscribe({
      next: (data) => (this.entradaForm.value = data),
      error: (err) => console.log(err),
      complete: () => {                                                
                      Swal.fire('Buen trabajo!', 'Cantidad agregada!', 'success');
                      this.router.navigate(['/listaProducto']);
                      }
    }) 
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

