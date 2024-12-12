import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAppService {

  private unique_name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }
  
  public getRoleFromApi(){
    return this.role$.asObservable()
  }

  public setRoleFromApi(role:string){
    this.role$.next(role);
  }

  public getNicknameFromApi(){
    return this.unique_name$.asObservable()
  }

  public setNicknameFromApi(unique_name:string){
    this.unique_name$.next(unique_name);
  }
}
