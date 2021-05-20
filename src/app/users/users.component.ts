import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../authGuard.guard';
import { UserInfoModel } from '../Classes/UserInfoModel';
import { SharedServiceService } from '../Services/shared-service.service';
import { UsersService } from '../Services/Users-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userObj:UserInfoModel= new UserInfoModel();
  userList: any[] = [];
  IsUpdate:boolean=false;
  user:any;
  ConfirmPass:any;
  RolesList:any[]=[{Name:'Admin'},{Name:'Regular'}]

  constructor(private service: SharedServiceService,private userService: UsersService, private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.atob(localStorage.getItem('postLoginData')));
    this.getUsersInfoList();
  }

  saveUsersInfo(){
    this.userService.SaveUsers(this.userObj)
		.subscribe(
			data => {
        if (data == true) {
          this.ResetUsersInfoEntryForm();
          this.getUsersInfoList();
          alert("Save Successfully");
        }
      }
		);
  }

  UpdateUsers(){
    this.userService.UpdateUsers(this.userObj)
		.subscribe(
			data => {
        if (data == true) {
          this.ResetUsersInfoEntryForm();
          this.getUsersInfoList();
          alert("Updated Successfully");
        }
      }
		);
  }

  ResetUsersInfoEntryForm(){
    this.userObj = new UserInfoModel();
    this.ConfirmPass = "";
    this.IsUpdate = false;
  }

  checkPassword(){
    if (this.ConfirmPass == this.userObj.pass) {
      return true;
    } else  {
      alert("Both Password should match");
      return false;
    }
  }

  EditUserInfo(item){
    this.IsUpdate = true;
    this.userObj = JSON.parse(JSON.stringify(item));
  }

  CheckDuplicateUserId(){
    var index = this.userList.findIndex(x => x.User_id === this.userObj.User_id);
    if (index>=0) {
      alert('UserID can not be duplicate');
      this.userObj.User_id=null;
    }
  }

  getUsersInfoList() {
		this.userService.getUsersLists()
			.subscribe(
				data => {
          if (data.length > 0) {
            this.userList = data;
          }
        }
			);
	}

  DeleteUsers(userObj){
    this.userService.DeleteUsers(userObj.ID)
			.subscribe(
				data => {
          if (data == true) {
            this.ResetUsersInfoEntryForm();
            this.getUsersInfoList();
            alert("Deleted Successfully");
          }
        }
			);
  }

}
