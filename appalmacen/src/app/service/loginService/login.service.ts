import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environonments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, throwError } from 'rxjs';

//Sweetalert
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = environment.localHost;
  private userPayload:any;

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

  constructor(
              private http: HttpClient              
              ) 
  {
    this.userPayload = this.decodedToken();
  }

  loginUser(Login: any){
    return this.http.post<any>(this.API_URI+"/login/login", Login)
    .pipe(
      catchError(this.handleError)
    );
  }

  storeToken(tokenValue: string|any){
    localStorage.setItem('token', tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  removeToken(tokenValue: any){
    return localStorage.removeItem(tokenValue);
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }
  
  getNicknameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getUserDataFromToken(){
    if(this.userPayload)
    return this.userPayload.certpublickey;
  }
  
}
