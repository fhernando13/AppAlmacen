import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAppService } from '../../service/user-app-service/user-app.service';
import { LoginService } from '../../service/loginService/login.service';

//Sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isDarkThemeActive = this.statusBotton(false);
  public unique_name : string = "";
  public role : string = "";
  icon = '';
  themes = '';
  click = true;
  mode = '';
  key = 'Change password';
  modetheme = '';

  constructor(
    @Inject(DOCUMENT)private document: Document,    
    private router: Router,
    private userApp: UserAppService,
    private loginService: LoginService){
  }

  ngOnInit(){
    this.theme();
    this.getNickname();
    this.getRole();
  }

  statusBotton(themes: boolean){
    if(localStorage.getItem('dark'))
    {
      return true
    }
    else{
      return false
    }
  }

  theme(){
    const dato = localStorage.getItem('dark');
    if(dato){
      this.onChange(true);
    }else{
      this.onChange(false);
    }
  }

  onChange(newValue: boolean){ 
    var dark = this.document.body.classList.add('darkMode');
    if(newValue){
      localStorage.setItem('dark', JSON.stringify(dark));
      this.icon = 'brightness_2';
      this.mode = 'ON'      
      this.modetheme = 'modo nocturno'
    }
    else{
      localStorage.removeItem('dark');
      this.document.body.classList.remove('darkMode');   
      this.icon = 'brightness_5';
      this.mode = 'OFF';
      this.modetheme = 'modo día'
    }
  }

  logOut(): void{    
    try{
      localStorage.removeItem('dark');
      this.onChange(false);
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
    catch(error){
      console.log(error);
    }
  }     

  getNickname(){
    this.userApp.getNicknameFromApi()
    .subscribe(val=>{
      const fullNameFromToken = this.loginService.getNicknameFromToken();
      this.unique_name = val || fullNameFromToken;      
    })
  }
  
  getRole(){
    this.userApp.getRoleFromApi()
    .subscribe(val2=>{
      const fullRolFromToken = this.loginService.getRoleFromToken()
      this.role = val2 || fullRolFromToken;
      console.log(this.role)
    })
  }
    

}
