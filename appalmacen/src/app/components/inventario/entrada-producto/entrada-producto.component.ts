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
  selector: 'app-entrada-producto',
  templateUrl: './entrada-producto.component.html',
  styleUrls: ['./entrada-producto.component.scss']
})
export class EntradaProductoComponent implements OnInit {

  productid = '';
  cantidad_up = '';
  number3 = 0; // suma
  today = new Date();
  button = "agregar";
  title = "registrar entrada";
  entradaForm: FormGroup | any;
  updateProVal: any = [];
  prods: any = [];
  moves: any = [];
  users: any = [];
  curr_prod = '';

    createFormGroup() {
      return new FormGroup({        
        FechaInventario: new FormControl(this.today.toJSON().slice(0, 19).replace('T', ' ')),   
        Cantidad: new FormControl('', [CustomValidators.onlyNumbers, Validators.required, Validators.minLength(1)]),
        UsuarioId: new FormControl('',[Validators.required]), 
        ProductoId: new FormControl('', [Validators.required]),
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
    return this.entradaForm.get('UsuarioId');
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
    await this.usuarioService.getAllUsersAdmin().subscribe({
     next: user =>{ this.users = user},
     error: err =>{console.log(err)}}
   );
  } 

  buttonSave(){
    if(this.entradaForm){      
      this.productid = this.ProductoId.value;       
      // Existencia producto
      this.inventarioService.getExistProd(this.productid).subscribe({
        next: data =>{this.curr_prod = String(Object.values(data[0]))
          this.number3 = Number(this.curr_prod)+Number(this.Cantidad.value)          
          this.updatePro(this.productid, this.number3);
          this.movimientoService.addInvetary(this.entradaForm.value).subscribe({
            next: (data) => (this.entradaForm.value = data),
            error: (err) => console.log(err)
          });
          Swal.fire('Buen trabajo!', 'Cantidad agregada!', 'success');
          this.router.navigate(['/listaProducto']);
        },
        error: err =>{console.log(err)}
      })          
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

