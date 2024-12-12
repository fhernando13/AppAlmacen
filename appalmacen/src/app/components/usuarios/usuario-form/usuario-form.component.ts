import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { RolesService } from 'src/app/service/rolesService/roles.service';
import { Usuarios } from 'src/app/models/usuarios';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      NombreUsuario: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      CorreoUsuario: new FormControl('',[Validators.required, Validators.email]),
      EstatusUsuario: new FormControl('',[Validators.required]),      
      PasswordUsuario: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      PasswordUsuario2: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      RolId: new FormControl('',[Validators.required]),
    });
  }

  button = "registrar";
  title = "registrar usuario";
  userForm: FormGroup | any;
  role_user = '';
  roles: any = [];
  option = [
    {value:true, key:'Activo'},
    {value:false, key:'Inactivo'}];

  constructor(private usuarioService: UsuarioService,
              private rolesService: RolesService,
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

  get RolId() {
    return this.userForm.get('RolId');
  }

  get PasswordUsuario() {
    return this.userForm.get('PasswordUsuario');
  }

  get PasswordUsuario2() {
    return this.userForm.get('PasswordUsuario2');
  }

  ngOnInit(){
    this.listRoles();
  }

  async listRoles(){
    await this.rolesService.getAllRoles().subscribe({
     next: rols =>{ this.roles = rols, console.log(rols)},
     error: err =>{console.log(err)}}
   );
 }

 userSave(){
  if (this.userForm) {
    if(this.PasswordUsuario.value === this.PasswordUsuario2.value)
    {              
      console.log(this.userForm.value);
      this.usuarioService.saveUser(this.userForm.value).subscribe({
      next: (data) => this.userForm.value = data,
      error: (err) => console.log(err),
      });
      Swal.fire('Buen trabajo!', 'Usuario registrado!', 'success');
      const list = this.router.navigate(['/listaUsuario']);
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password are deferents!',
      })
    }
  } else {
    console.log('error');
  }
  return 'ok';
}


}
