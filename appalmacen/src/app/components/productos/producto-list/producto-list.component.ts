import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/service/productoService/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {

  public role : string = "";
  suburbs: any = [];
  idproducto: any;
  title="productos"
  displayedColumns = ['Id','Nombre','Precio','Status', 'Existencia', 'Opciones'];
  dataSource = new MatTableDataSource();
  selectedUser:  any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public productoService: ProductoService,
              private router: Router,
              private activatedRoute: ActivatedRoute)
    {
    }

  ngOnInit(){
    this.listProductos();
  }

  listenButton(id:string){
    this.idproducto = id
  }

  async listProductos(){
    await this.productoService.getAllProducts().subscribe({
     next: res =>{
       this.dataSource.data = res
     },
     error: err =>{console.log(err)}}
   );
  }



  updateProduct(){
    if(this.idproducto){
      this.router.navigate(['/updateProducto',this.idproducto]);
    }else{
      this.idproducto='';
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes elegir un producto para actualizarlo!"
      });
    }
  }
 // statusProducto
  deleteProduct(){
    if(this.idproducto){
      this.router.navigate(['/statusProducto',this.idproducto]);
    }else{
      this.idproducto='';
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes elegir un producto para cambiar el estatus!"
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
