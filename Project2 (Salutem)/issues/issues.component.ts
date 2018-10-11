import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { HealthResultService } from '../services/health-result.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private healthResultService: HealthResultService) { }

  ngOnInit() {
    // document.getElementById("navPropos").setAttribute("disabled","");
    // document.getElementById("navSpec").setAttribute("disabled","");
    // document.getElementById("navDiagnosis").setAttribute("disabled","");
    this.healthResultService.loadIssues().subscribe((allIssues) => {this.issues = allIssues});
  }

  isClicked: boolean = false;
  issues: Issue[] = [];
  issueId: number;

  getIssues() {
    this.issueId = parseInt((<HTMLInputElement>document.getElementById("issueSelector")).value);
    //localStorage.setItem("bodyId", this.bodyId + "");
    console.log(this.issueId);
    this.healthResultService.loadIssues().subscribe((allIssues) => {
      this.issues = allIssues;
      this.populateIssues();
    });

    console.log("the issueId" + this.issueId);
    this.populateIssues();
  } // end getIssues()

  populateIssues() {
      let optionsList = document.getElementById("issueSelector");
      //console.log("optionslist:  " + JSON.stringify(optionsList));
      optionsList.innerHTML = "";
      this.issues.forEach(element => {
        let tmpOption = document.createElement("option");
        tmpOption.setAttribute("value", element.ID + "");
        tmpOption.innerText = element.Name;
        optionsList.appendChild(tmpOption);
      });
    } // end populateIssues()

}





