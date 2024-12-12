import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  
  users: any = [];
  id_user: any;
  title="usuarios"
  displayedColumns = ['Id','Nombre','Nickname','Status','Role','Options'];
  dataSource = new MatTableDataSource();
  selectedUser:  any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute)
    {
    }

  ngOnInit(){
    this.listUsers();
  }

  listenButton(id:string){
    this.id_user = id
  }
  
  getUser(id:string){
    this.id_user = id;
  }  

  async listUsers(){
    await this.usuarioService.getAllUsersByRole().subscribe({
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

  deleteUser(){
    if(this.id_user){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No lo podrás revetir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borraló!'
      }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(this.id_user).subscribe
          ({
            next: res =>{ this.users = res },
            error: err =>{console.log(err)}
          });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Has borrado un usuario",
          showConfirmButton: false,
          timer: 1500
        });
        this.id_user='';  
        location.reload();
      }})        
      }else{
        this.id_user='';
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes elegir un usuario antes de poder borrar!!!"
        });
      }  
  }

  updateUser(){
    if(this.id_user){
      this.router.navigate(['/updateUsuario',this.id_user]);
    }else{
      this.id_user='';
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes elegir un usuario antes de poder actualizar!!!"
      });
    }
  }


}
