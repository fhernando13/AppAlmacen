import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioUpdaComponent } from './components/usuarios/usuario-upda/usuario-upda.component';
import { LoginComponent } from './components/login/login/login.component';

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule  } from '@angular/material/menu';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ProductoListComponent } from './components/productos/producto-list/producto-list.component';
import { ProductoUpdaComponent } from './components/productos/producto-upda/producto-upda.component';
import { ProductoSimpleComponent } from './components/productos/producto-simple/producto-simple.component';
import { EntradaProductoComponent } from './components/inventario/entrada-producto/entrada-producto.component';
import { SalidaProductoComponent } from './components/inventario/salida-producto/salida-producto.component';
import { HistoricoComponent } from './components/inventario/historico/historico.component';
import { StatusValPipe } from './utils/status-val.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    UsuarioUpdaComponent,
    LoginComponent,
    ProductoFormComponent,
    ProductoListComponent,
    ProductoUpdaComponent,
    ProductoSimpleComponent,
    EntradaProductoComponent,
    SalidaProductoComponent,
    HistoricoComponent,
    StatusValPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
