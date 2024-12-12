import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuarios } from 'src/app/models/usuarios';
import { Observable } from 'rxjs';
import { environment } from 'src/environonments/environment.prod';
import { catchError, throwError } from 'rxjs';

//Sweetalert
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = environment.localHost;

  constructor(private http: HttpClient) 
  {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } 
    if(error.status === 400)
    {
      // console.error('User not exist!!', error.error);
      Swal.fire({
        icon: 'error',
        title: 'Try again',
        text: 'User or password incorrect!'          
      })
    }
    if(error.status === 401)
    {
      // console.error('Password is incorrect');
      Swal.fire({
        icon: 'error',
        title: 'Try again',
        text: 'User or password incorrect!'          
      })
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  saveUser(user: Usuarios){
    return this.http.post(this.API_URI+"/usuarios/registrar",user)
    .pipe(
      catchError(this.handleError)
    );
  }  

  getAllUsers(){
    return this.http.get<Usuarios[]>(this.API_URI+"/usuarios/listausuarios");    
  }

  getAllUsersByRole(){
    return this.http.get<Usuarios[]>(this.API_URI+"/usuarios/usuariosbyrol");    
  }

  getUser(id: string): Observable<any>{
    return this.http.get(this.API_URI+"/usuarios/usuario/"+id);
  }

  getUsersByRol(id: string): Observable<any>{
    return this.http.get(this.API_URI+"/usuarios/usuariorol/"+id);
  }

  updateUser(id: string, updateUser: Usuarios): Observable<any>{
    return this.http.put(this.API_URI+"/usuarios/actualizar/"+id, updateUser)
  }

  deleteUser(id:string): Observable<any>{
    return this.http.delete(this.API_URI+"/usuarios/eliminar/"+id)    
  }
}
