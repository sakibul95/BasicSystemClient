import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  readonly APIURL = "https://localhost:5001/api";
  postLoginData:any;

  token = localStorage.getItem('jwt');
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.token
  }

  constructor(private http:HttpClient) { }
  
  getPostLoginData(User_id:any,pass:any):Observable<any[]>{
    return  this.http.get<any>(this.APIURL+'/login/'+User_id+'/'+pass);
  }

  SaveUserInfo(user:any):Observable<boolean>{
    return  this.http.post<boolean>(this.APIURL+'/userinfo/', user);
  }

}
