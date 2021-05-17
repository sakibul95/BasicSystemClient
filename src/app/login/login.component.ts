import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfoModel } from '../Classes/UserInfoModel';
import { SharedServiceService } from "../Services/shared-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserInfoModel = new UserInfoModel();
	// UserName:string;
	// UserPassword:string;
  ConfirmPassword:string;
  postLoginData:any;
  IsSignUp:boolean = false;
  constructor(public el: ElementRef, private router: Router,private service:SharedServiceService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {

  }

  async signIn(){
    var result = await this.service.getPostLoginData(this.user.User_id,this.user.pass).toPromise().then((data:any)=>{
      this.postLoginData = data;
      this.service.postLoginData = data;
      var Demo = window.btoa(JSON.stringify(this.postLoginData));
      localStorage.setItem('postLoginData', Demo);
      localStorage.setItem("jwt", this.postLoginData.token);
      if (this.postLoginData.token && !this.jwtHelper.isTokenExpired(this.postLoginData.token)) {
        this.router.navigate(['items']);
      }
      else {
        this.router.navigate(['login']);
      }
    });
  }

  checkPassword(){
    if (this.ConfirmPassword == this.user.pass) {
      return true;
    } else  {
      alert("Both Password should match");
      return false;
    }
  }

  signUp(){
    var valid = this.checkPassword();
    if (valid) {
      this.user.role = "Regular";
      this.service.SaveUserInfo(this.user)
		  .subscribe(
			data => {
        if (data) {
          alert("Saved Successfull");
          this.IsSignUp = false;
          this.user = new UserInfoModel();
          this.ConfirmPassword = "";
          this.router.navigate(['login']);
        }
      }
		);
    }
  }
  

}
