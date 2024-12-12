import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roles } from 'src/app/models/roles';
import { Observable } from 'rxjs';
import { environment } from 'src/environonments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_URI = environment.localHost;

  constructor(private http: HttpClient) 
  {

  }

  getAllRoles(){
    return this.http.get<Roles[]>(this.API_URI+"/roles/listaroles");    
  }
}
