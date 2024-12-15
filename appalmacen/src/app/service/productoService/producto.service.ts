import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Productos } from 'src/app/models/producto';
import { Observable } from 'rxjs';
import { environment } from 'src/environonments/environment.prod';
import { catchError, throwError } from 'rxjs';

//Sweetalert
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API_URI = environment.localHost;

  constructor(private http: HttpClient) 
  {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Se produjo un error:', error.error);
    } 
    if(error.status === 400)
    {
      // console.error('User not exist!!', error.error);
      Swal.fire({
        icon: 'error',
        title: '400',
        text: 'el servidor no pudo procesar una solicitud del cliente!'          
      })
    }
    if(error.status === 401)
    {
      // console.error('Password is incorrect');
      Swal.fire({
        icon: 'error',
        title: '401',
        text: 'credenciales invalidas!'          
      })
    }
    else {
      console.error(
        `Código devuelto por el backend ${error.status}, el cuerpo estaba: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Algo malo pasó; por favor inténtalo de nuevo más tarde.'));
  }

  saveProduct(producto: Productos){
    return this.http.post(this.API_URI+"/productos/registrar",producto)
    .pipe(
      catchError(this.handleError)
    );
  }  

  getAllProducts(){
    return this.http.get<Productos[]>(this.API_URI+"/productos/listaproductos");    
  }

  getProductsActives(){
    return this.http.get<Productos[]>(this.API_URI+"/productos/productosactivos");    
  }

  getProduct(id: string): Observable<any>{
    return this.http.get(this.API_URI+"/productos/producto/"+id);
  }

  updateProduct(id: string, updatePro: Productos): Observable<any>{
    return this.http.put(this.API_URI+"/productos/actualizar/"+id, updatePro);
  }  

  deleteProduct(id:string): Observable<any>{
    return this.http.delete(this.API_URI+"/productos/eliminar/"+id)    
  }
  
}
