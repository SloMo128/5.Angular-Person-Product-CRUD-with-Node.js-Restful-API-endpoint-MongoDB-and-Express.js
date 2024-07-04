import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  title = 'angular';

  collapsed: boolean = true;

  isLoggedIn = false


  ngOnInit(){
    let storeDataAdmin = localStorage.getItem("isAdminLoggedIn");
    let storeDataUser = localStorage.getItem("isUserLoggedIn");

    if (storeDataAdmin != null && storeDataAdmin == "true" || storeDataUser != null && storeDataUser == "true") {
       this.isLoggedIn = true;
    } else{
       this.isLoggedIn = false;
    }
  }
}