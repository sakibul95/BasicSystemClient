import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../authGuard.guard';
import { ItemsModel } from '../Classes/ItemsModel';
import { SharedServiceService } from '../Services/shared-service.service';
import { itemService } from '../Services/items-service.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemObj:ItemsModel= new ItemsModel();
  itemList: any[] = [];
  IsUpdate:boolean=false;
  user:any;

  constructor(private service: SharedServiceService,private itemService: itemService, private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.atob(localStorage.getItem('postLoginData')));
    this.getItemInfoList();
  }

  saveItemsInfo(){
    var permited = this.CheckPermission('W');
    if (permited) {
      this.itemService.SaveItems(this.itemObj)
		  .subscribe(
		  	data => {
          if (data == true) {
            this.ResetItemsInfoEntryForm();
            this.getItemInfoList();
            alert("Save Successfully");
          }
        }
		  );
    } else {
      alert("You are not permited.");
    }
    
  }

  UpdateItemsInfo(){
    var permited = this.CheckPermission('W');
    if (permited) {
      this.itemService.UpdateItems(this.itemObj)
		  .subscribe(
		  	data => {
          if (data == true) {
            this.ResetItemsInfoEntryForm();
            this.getItemInfoList();
            alert("Updated Successfully");
          }
        }
		  );
    } else {
      alert("You are not permited.");
    }
    
  }

  ResetItemsInfoEntryForm(){
    this.itemObj = new ItemsModel();
    this.IsUpdate = false;
  }

  EditItemInfo(item){
    this.IsUpdate = true;
    this.itemObj = JSON.parse(JSON.stringify(item));
  }

  CheckDuplicateItemId(){
    var index = this.itemList.findIndex(x => x.code === this.itemObj.code);
    if (index>=0) {
      alert('ID can not be duplicate');
      this.itemObj.code=null;
    }
  }


  CheckPermission(type){
    if (this.user.role == "Regular") {
      var avail = this.user.TblUserAccess.findIndex(x => x.Menu === 'Items');
      if (avail >= 0) {
        if (type == "R" && this.user.TblUserAccess[avail].Read == true) {
          return true;
        } 
        else if (type == "W" && this.user.TblUserAccess[avail].Write == true) {
          return true;
        }
        else if (type == "D" && this.user.TblUserAccess[avail].Delete == true) {
          return true;
        }
        else {
          return false;
        }
      } else {
        return false;
      }
      
    } else {
      return true;
    }
  }

  getItemInfoList() {
    var permited = this.CheckPermission('R');
    if (permited) {
      this.itemService.getItemsLists()
			.subscribe(
				data => {
          if (data.length > 0) {
            this.itemList = data;
          }
        }
			);
    } else {
      alert("You are not permited to view the List");
    }
		
	}

  DeleteItemInfo(itemobj){
    var permited = this.CheckPermission('D');
    if (permited) {
      this.itemService.DeleteItemInfo(itemobj.Id)
			.subscribe(
				data => {
          if (data == true) {
            this.ResetItemsInfoEntryForm();
            this.getItemInfoList();
            alert("Deleted Successfully");
          }
        }
			);
    } else {
      alert("You are not permited to Delete");
    }
    
  }


}
