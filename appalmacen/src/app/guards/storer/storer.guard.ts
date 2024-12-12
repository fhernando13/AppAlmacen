import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { LoginService } from 'src/app/service/loginService/login.service';

//Sweetalert
import Swal from 'sweetalert2'

export const storerGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(LoginService);
  const routerService = inject(Router);

  const roles =  tokenService.getRoleFromToken();
  
  if(roles != 2 || roles != '2'){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Eres admin, no debes estar aqui!!!'
    });
    routerService.navigate(['/listaProducto']);
    return false
  }
  return true;
};