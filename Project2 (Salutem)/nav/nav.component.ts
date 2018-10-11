import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginCheck();
  }

  logout(){
    localStorage.clear();
  }

  loginCheck(){
    // var sessionsStatus= localStorage.getItem("isValidLogin").toString();
    // console.log(sessionsStatus);
    if (isNullOrUndefined(localStorage.getItem("isValidLogin")) ){
      this.router.navigateByUrl("/login");
    }
    var sessionsStatus = localStorage.getItem("isValidLogin").toString();
    console.log(sessionsStatus);
    if (sessionsStatus !== "true") {
      this.router.navigateByUrl("/login");
    }
  }


}
