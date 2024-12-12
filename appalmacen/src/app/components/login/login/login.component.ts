import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService/login.service';
import { UserAppService } from 'src/app/service/user-app-service/user-app.service';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private emailPattern: any =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  title = "Add information the user";
  button = "save";
  viewPass = '';

  createFormGroup() {
    return new FormGroup({      
      CorreoUsuario: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      PasswordUsuario: new FormControl('', [Validators.maxLength(15), Validators.minLength(6), Validators.required])
    });
  }

  loginForm: FormGroup | any;
  passWD = 'visibility';

  constructor(private loginService: LoginService,
    private userApp: UserAppService,
    private router: Router)
  {
    this.loginForm = this.createFormGroup();
  }

  get CorreoUsuario() {
    return this.loginForm.get('CorreoUsuario');
  }
  get PasswordUsuario() {
    return this.loginForm.get('PasswordUsuario');
  }  

  Login(){
    if(this.loginForm.valid)      
    {
      this.loginService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.value = res;          
          this.loginService.storeToken(res.token);
          const tokenPayLoad = this.loginService.decodedToken()
          this.userApp.setNicknameFromApi(tokenPayLoad.unique_name);
          this.userApp.setRoleFromApi(tokenPayLoad.role);
        },
        complete: () => {this.router.navigate(['/listaUsuario']),
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Welcome",
                          showConfirmButton: false,
                          timer: 1500
                        })}
      })
    }
    return this.router.navigate(['/login']);

  }

  changeType(){
    let showPassword :any = document.getElementById('pass1');
    if(showPassword.type == "password")
      {showPassword.type = "text";
      this.passWD = 'visibility_off';
      this.viewPass = 'hide the password';
    }            
    else{
      showPassword.type = "password";
      this.passWD = 'visibility';
      this.viewPass = 'show the password';
    }
  }

}
