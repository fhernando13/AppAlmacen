import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/productoService/producto.service';

//Sweetalert
import Swal from 'sweetalert2'

interface EstatusProducto {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-producto-upda',
  templateUrl: './producto-upda.component.html',
  styleUrls: ['./producto-upda.component.scss']
})
export class ProductoUpdaComponent implements OnInit {

  button = "agregar";
  title = "Actualizar producto";
  productForm: Productos | any;
  statusProduct = '';
  existProduct = '';
  estados: EstatusProducto[] = [
    {value: true, viewValue: 'Activo'},
    {value: false, viewValue: 'Inactivo'},
  ];

  createFormGroup() {
    return new FormGroup({
      Idproducto: new FormControl(0),
      NombreProducto: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      PrecioProducto: new FormControl('',[Validators.required]),         
      EstatusProducto: new FormControl('',[Validators.required]),  
      ExistenciaProducto: new FormControl(this.statusProduct),  
    });
  }

  constructor(private productoService: ProductoService,
              private router: Router,
              private activedRouted: ActivatedRoute)
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

  get ExistenciaProducto() {
    return this.productForm.get('ExistenciaProducto');
  }

  ngOnInit(){  
    this.getProduct();
  }

  getProduct(){
    const idprod = <string>this.activedRouted.snapshot.params["Idproducto"];
    if(idprod){
      this.productoService.getProduct(idprod).subscribe(
      {
        next: data=>(this.productForm.setValue(data[0]),
              this.statusProduct = data.ExistenciaProducto
            ),                        
        error: err=>(console.log(err)),
      })
    }
  }

  buttonSave(){
    const idprod = this.activedRouted.snapshot.params['Idproducto'];
    if (this.productForm) {
      this.productoService.updateProduct(idprod, this.productForm.value).subscribe({
        next: (data) => this.productForm = data,
        error: (err) => console.log(err)
        });      
        Swal.fire('Buen trabajo!', 'Producto actualizado!', 'success');
        this.router.navigate(['/listaProducto']);
      }
    return 'ok';
  }

}
