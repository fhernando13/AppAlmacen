import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/service/productoService/producto.service';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto-status',
  templateUrl: './producto-status.component.html',
  styleUrls: ['./producto-status.component.scss']
})
export class ProductoStatusComponent implements OnInit {

  button = "cambiar";
  title = "cambiar estatus";
  productForm: FormGroup | any;
  priceProduct = '';
  nameProduct = '';
  existProduct = '';
  option = [
    {value:true, key:'Activo'},
    {value:false, key:'Inactivo'}];
  
  createFormGroup() {
    return new FormGroup({
      NombreProducto: new FormControl(this.nameProduct),
      PrecioProducto: new FormControl(this.priceProduct),   
      EstatusProducto: new FormControl(),  
      ExistenciaProducto: new FormControl(this.existProduct), 
    });
  }

  constructor(private productoService: ProductoService,
              private router: Router,
              private activedRouted: ActivatedRoute)
  {
    this.productForm = this.createFormGroup()
  }  

  get EstatusProducto() {
    return this.productForm.get('EstatusProducto');
  }

  get NombreProducto() {
    return this.productForm.get('NombreProducto');
  }

  get PrecioProducto() {
    return this.productForm.get('PrecioProducto');
  }

  get ExistenciaProducto() {
    return this.productForm.get('ExistenciaProducto');
  }

  ngOnInit(){  
    this.getProduct();
  }

  getProduct(){
    const idprod = this.activedRouted.snapshot.params['Idproducto'];
    if(idprod){      
      const res:any = this.productoService.getProduct(idprod).subscribe(
      {
        next: data=>(this.productForm.patchValue
              ({                
                NombreProducto: data.NombreProducto,
                PrecioProducto: data.PrecioProducto,
                EstatusProducto: data.EstatusProducto,
                ExistenciaProducto: data.ExistenciaProducto,
              }),
              this.nameProduct = data.NombreProducto,
              this.priceProduct = data.PrecioProducto,
              this.existProduct = data.ExistenciaProducto
            ),                        
        error: err=>(console.log(err)),
      })
    }
  }

  buttonSave(){
    const idprod = this.activedRouted.snapshot.params['Idproducto'];    
    if (this.productForm) {    
      this.productoService.updateProduct(idprod, this.productForm.value).subscribe({
        next: (data) => this.productForm.value = data,
        error: (err) => console.log(err),
        complete: () => { 
                        Swal.fire('Buen trabajo!', 'Producto actualizado!', 'success');
                        const list = this.router.navigate(['/listaProducto']);
        }
        });        
      }
    return 'ok';
  }

}
