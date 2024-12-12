import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventarios } from 'src/app/models/inventario';
import { Productos } from 'src/app/models/producto';
import { Observable } from 'rxjs';
import { environment } from 'src/environonments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  API_URI = environment.localHost;

  constructor(private http: HttpClient) 
  {

  }

  historyProds(){
    return this.http.get<Inventarios[]>(this.API_URI+"/inventario/historico");    
  }

  //join
  historyComplete(){
    return this.http.get<Inventarios[]>(this.API_URI+"/inventario/historicocompleto");    
  }

  getExistProd(id:string): Observable<any>{
    return this.http.get(this.API_URI+"/inventario/existencia/"+id);
  }

  entryProduct(id: string, updatePro: Productos): Observable<any>{
    return this.http.put(this.API_URI+"/inventario/entradaProducto/"+id, updatePro);
  }

}
