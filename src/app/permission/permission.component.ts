import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../authGuard.guard';
import { UserInfoModel } from '../Classes/UserInfoModel';
import { SharedServiceService } from '../Services/shared-service.service';
import { UsersService } from '../Services/Users-service.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  SelectedUser:any;
  userList:any[]=[];
  IsUpdate:boolean=false;
  user:any;
  permissionList:any[]=[];

  constructor(private service: SharedServiceService,private userService: UsersService, private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.getUsersInfoList();
    this.user = JSON.parse(window.atob(localStorage.getItem('postLoginData')));
  }

  getUsersInfoList() {
		this.userService.getUsersRoleLists('Regular')
			.subscribe(
				data => {
          if (data.length > 0) {
            this.userList = data;
          }
        }
			);
	}

  getPermissionList(){
    if (this.SelectedUser != 'null') {
      this.userService.getPermissionLists(this.SelectedUser)
			.subscribe(
				data => {
          if (data.length > 0) {
            this.permissionList = data;
          }
        }
			);
    } else this.permissionList = [];
  }

  UpdatePermission(item){
    this.userService.UpdatePermission(item)
		.subscribe(
			data => {
        if (data == true) {
          this.getPermissionList();
          alert("Updated Successfully");
        }
      }
		);
  }

  UpdateCheckBox(item, chk){
    if (chk == 'R') {
      if (item.Read == true) {
        item.Read = false;
      } else {
        item.Read = true;
      }
    }
    if (chk == 'W') {
      if (item.Write == true) {
        item.Write = false;
      } else {
        item.Write = true;
      }
    }
    if (chk == 'D') {
      if (item.Delete == true) {
        item.Delete = false;
      } else {
        item.Delete = true;
      }
    }
  }

}
