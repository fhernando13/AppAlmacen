import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { RolesService } from 'src/app/service/rolesService/roles.service';
import { Usuarios } from '../../../models/usuarios';

//Sweetalert
import Swal from 'sweetalert2'

interface EstatusUsuario {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-upda',
  templateUrl: './usuario-upda.component.html',
  styleUrls: ['./usuario-upda.component.scss']
})
export class UsuarioUpdaComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      Idusuario: new FormControl(0),
      NombreUsuario: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      CorreoUsuario: new FormControl('',[Validators.required]),
      EstatusUsuario: new FormControl('',[Validators.required]),
      PasswordUsuario: new FormControl(this.passuser),
      RolId: new FormControl('',[Validators.required]),
    });
  }

  button = "actualizar";
  title = "actualizar usuario";
  passuser = '';
  statusUser = '';

  userForm: Usuarios | any;
  roles: any = [];
  estados: EstatusUsuario[] = [
    {value: true, viewValue: 'Activo'},
    {value: false, viewValue: 'Inactivo'},
  ];

    constructor(private usuarioService: UsuarioService,
                private rolesService: RolesService,
                private activedRouted: ActivatedRoute,
                private router: Router)
    {
      this.userForm = this.createFormGroup()
    }

  get NombreUsuario() {
  return this.userForm.get('NombreUsuario');
  }

  get CorreoUsuario() {
  return this.userForm.get('CorreoUsuario');
  }

  get EstatusUsuario() {
  return this.userForm.get('EstatusUsuario');
  }

  get PasswordUsuario() {
  return this.userForm.get('PasswordUsuario');
  }

  get RolId() {
  return this.userForm.get('RolId');
  }

  ngOnInit(){
    this.listRoles();
    this.getUpdateUser();
  }

  async listRoles(){
    await this.rolesService.getAllRoles().subscribe({
     next: rols =>{ this.roles = rols},
     error: err =>{console.log(err)}}
   );
  }

  getUpdateUser(){
    const iduser = <string>this.activedRouted.snapshot.params["Idusuario"];
    if(iduser){
      this.usuarioService.getUser(iduser).subscribe(
      {        
        next: data=>(this.userForm.setValue(data[0]),
              this.passuser = data.PasswordUsuario,
              console.log(data)
            ),
        error: err=>(console.log(err)),
      })
    }
  }

  userSave(){
    const iduser = this.activedRouted.snapshot.params['Idusuario'];
    if (this.userForm) {
      this.usuarioService.updateUser(iduser, this.userForm.value).subscribe({
        next: (data) => this.userForm.value = data,
        error: (err) => console.log(err),
      });
      Swal.fire('Buen trabajo!', 'Usuario actualizado!', 'success');
    } else {
      console.log('error');
    }
    return this.router.navigate(['/listaUsuario']);
  }


}
