import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem("bodyId");
    localStorage.removeItem("bodySympId");
    localStorage.removeItem("subBodyId");
    // document.getElementById("navBody").setAttribute("disabled","");
    // document.getElementById("navIssues").setAttribute("disabled","");
    // document.getElementById("navIssue").setAttribute("disabled","");
    // document.getElementById("navPropos").setAttribute("disabled","");
    // document.getElementById("navSpec").setAttribute("disabled","");
    // document.getElementById("navDiagnosis").setAttribute("disabled","");
  }

}
