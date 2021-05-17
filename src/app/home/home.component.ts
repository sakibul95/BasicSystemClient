import { Component, OnInit, ElementRef,Renderer2  } from '@angular/core';
import { SharedServiceService } from '../Services/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  constructor(private service: SharedServiceService, public el:ElementRef,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.atob(localStorage.getItem('postLoginData')));
  }

  navClick(nav,event){
    if (event.currentTarget.id == 'LogOut') {
      localStorage.clear();
    }
  }

}
