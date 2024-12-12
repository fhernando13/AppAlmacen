import { Component, OnInit, ViewChild } from '@angular/core';
import { InventarioService } from 'src/app/service/inventarioService/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  suburbs: any = [];
  idproducto: any;
  title="productos"
  displayedColumns = ['Id','Producto','Cantidad','Usuario','Movimiento','Fecha'];
  dataSource = new MatTableDataSource();
  selectedUser:  any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public inventarioService: InventarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute)
    {
    }

  ngOnInit(){
    this.history();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async history(){
    await this.inventarioService.historyComplete().subscribe({
     next: res =>{this.dataSource.data = res, console.log(res)},
     error: err =>{console.log(err)}}
   );
  }

}
