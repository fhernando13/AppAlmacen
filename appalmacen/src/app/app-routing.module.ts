import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { authGuard } from './guards/auth/auth.guard';

// Componentes
import { LoginComponent } from './components/login/login/login.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioUpdaComponent } from './components/usuarios/usuario-upda/usuario-upda.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listaUsuario',   canActivate:[authGuard],  component: UsuarioListComponent },
  { path: 'formUsuario',   canActivate:[authGuard], component: UsuarioFormComponent },
  { path: 'updateUsuario/:Idusuario',  canActivate:[authGuard], component: UsuarioUpdaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
