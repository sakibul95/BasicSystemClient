import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedServiceService } from './shared-service.service';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    constructor(private sharedService: SharedServiceService, private http:HttpClient, private jwtHelper:JwtHelperService) { }

  token = localStorage.getItem('jwt');

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  UnAuthorized(){
    alert("UnAuthorized");
  }

  getUsersLists():Observable<any>{
    if (this.isUserAuthenticated()) {
      return  this.http.get<any>(this.sharedService.APIURL+'/UserInfo',{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  getUsersRoleLists(role:any):Observable<any>{
    if (this.isUserAuthenticated()) {
      return  this.http.get<any>(this.sharedService.APIURL+'/UserInfo/userList/'+role,{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  SaveUsers(val:any){
    if (this.isUserAuthenticated()) {
      return this.http.post(this.sharedService.APIURL+'/UserInfo',val);
    } else this.UnAuthorized();
  }

  UpdateUsers(val:any){
    if (this.isUserAuthenticated()) {
      return this.http.put(this.sharedService.APIURL+'/UserInfo',val);
    } else this.UnAuthorized();
  }

  DeleteUsers(Id: any) { 
    if (this.isUserAuthenticated()) {
      return this.http.delete(this.sharedService.APIURL+'/UserInfo/'+Id,{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  //Permission
  getPermissionLists(user_id:any):Observable<any>{
    if (this.isUserAuthenticated()) {
      return  this.http.get<any>(this.sharedService.APIURL+'/Permission/'+user_id,{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  UpdatePermission(val:any){
    if (this.isUserAuthenticated()) {
      return this.http.put(this.sharedService.APIURL+'/Permission',val,{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  
}
