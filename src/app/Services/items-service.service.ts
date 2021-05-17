import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedServiceService } from './shared-service.service';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class itemService {
    constructor(private sharedService: SharedServiceService, private http:HttpClient, private jwtHelper:JwtHelperService) { }

  token = localStorage.getItem('jwt');

//   headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': 'Bearer ' + this.token
//   }

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

  getItemsLists():Observable<any>{
    if (this.isUserAuthenticated()) {
      return  this.http.get<any>(this.sharedService.APIURL+'/items',{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  SaveItems(val:any){
    if (this.isUserAuthenticated()) {
      return this.http.post(this.sharedService.APIURL+'/items',val);
    } else this.UnAuthorized();
  }

  UpdateItems(val:any){
    if (this.isUserAuthenticated()) {
      return this.http.put(this.sharedService.APIURL+'/items',val);
    } else this.UnAuthorized();
  }

  DeleteItemInfo(Id: any) { 
    if (this.isUserAuthenticated()) {
      return this.http.delete(this.sharedService.APIURL+'/items/'+Id,{headers:new HttpHeaders(this.sharedService.headers)});
    } else this.UnAuthorized();
  }

  
}
