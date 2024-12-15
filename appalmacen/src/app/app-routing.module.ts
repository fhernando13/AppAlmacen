import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { authGuard } from './guards/auth/auth.guard';
import { adminGuard } from './guards/admin/admin.guard';
import { storerGuard } from './guards/storer/storer.guard';

// Componentes
import { LoginComponent } from './components/login/login/login.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioUpdaComponent } from './components/usuarios/usuario-upda/usuario-upda.component';
import { ProductoListComponent } from './components/productos/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ProductoUpdaComponent } from './components/productos/producto-upda/producto-upda.component';
import { ProductoSimpleComponent } from './components/productos/producto-simple/producto-simple.component';
import { EntradaProductoComponent } from './components/inventario/entrada-producto/entrada-producto.component';
import { SalidaProductoComponent } from './components/inventario/salida-producto/salida-producto.component';
import { HistoricoComponent } from './components/inventario/historico/historico.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listaUsuario',   canActivate:[authGuard, adminGuard],  component: UsuarioListComponent },
  { path: 'formUsuario',   canActivate:[authGuard, adminGuard], component: UsuarioFormComponent },
  { path: 'updateUsuario/:Idusuario',  canActivate:[authGuard, adminGuard], component: UsuarioUpdaComponent },
  { path: 'listaSimpleProducto',  canActivate:[authGuard],  component: ProductoSimpleComponent },
  { path: 'listaProducto',  canActivate:[authGuard, adminGuard],  component: ProductoListComponent },
  { path: 'formProducto',   component: ProductoFormComponent },
  { path: 'updateProducto/:Idproducto',  canActivate:[authGuard], component: ProductoUpdaComponent },
  { path: 'entradaProducto',  canActivate:[authGuard, adminGuard], component: EntradaProductoComponent },
  { path: 'salidaProducto',  canActivate:[authGuard, storerGuard], component: SalidaProductoComponent },
  { path: 'historicoInventario', canActivate:[authGuard, adminGuard], component: HistoricoComponent },
  { path: '**', redirectTo: 'forbidden'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
