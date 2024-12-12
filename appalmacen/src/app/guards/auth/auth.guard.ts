import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from 'src/app/service/loginService/login.service';

//Sweetalert
import Swal from 'sweetalert2'

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(LoginService);
  const routerService = inject(Router);
  const token = tokenService.isLoggedIn();
  if(!token){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes estar iniciar sesión!'
    });
    routerService.navigate(['/login']);
    return false
  }
  return true;
};
