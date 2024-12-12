import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/service/productoService/producto.service';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producto-simple',
  templateUrl: './producto-simple.component.html',
  styleUrls: ['./producto-simple.component.scss']
})
export class ProductoSimpleComponent implements OnInit {

  public role : string = "";
  suburbs: any = [];
  idproducto: any;
  title="productos"
  displayedColumns = ['Id','Nombre','Precio','Status', 'Existencia'];
  dataSource = new MatTableDataSource();
  selectedUser:  any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public productoService: ProductoService)
    {
    }
  
    ngOnInit(){
      this.listProductos();
    }      
  
    async listProductos(){
      await this.productoService.getProductsActives().subscribe({
       next: res =>{
         this.dataSource.data = res
       },
       error: err =>{console.log(err)}}
     );
    }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
