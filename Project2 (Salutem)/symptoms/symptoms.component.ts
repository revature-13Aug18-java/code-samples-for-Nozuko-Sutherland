import { Component, OnInit } from '@angular/core';
import { HealthResultService } from '../services/health-result.service';
import { Symptom, BodySymptom } from '../symptom';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {

  constructor(private healthResultService: HealthResultService) { 
  }

  ngOnInit() {

    this.healthResultService.loadSymptoms().subscribe((allSymptoms) => {
      this.symptoms = allSymptoms;
      this.populateSymptoms(this.symptoms);
    });
    
    // document.getElementById("navIssues").setAttribute("disabled","");
    // document.getElementById("navIssue").setAttribute("disabled","");
    // document.getElementById("navPropos").setAttribute("disabled","");
    // document.getElementById("navSpec").setAttribute("disabled","");
    // document.getElementById("navDiagnosis").setAttribute("disabled","");
  }

  isClicked: boolean = false;
  symptoms: Symptom[] = [];
  symptomId: string;
  healthLocationIds: number[];
  saveSymptomIdArray: string[] = [];

  // note: there are 1013 symptoms available

  sympId: number;

  populateSymptoms(symps: Symptom[]) {
      let dataList = document.getElementById("json-symptomsList");
      dataList.innerHTML = "";
      symps.forEach(item => {
        let tmpOption = document.createElement("option");
        tmpOption.setAttribute("value", item.ID + "");
        tmpOption.innerText = item.Name;
        dataList.appendChild(tmpOption);
      });
  }

  saveSymptoms() {
    this.sympId = parseInt((<HTMLInputElement>document.getElementById("json-symptomsList")).value);
    localStorage.setItem("sympId", this.sympId + "");
    console.log("the id from console " + this.sympId);
    console.log("The symptom id: " + localStorage.getItem("sympId"));

    // string array
    console.log("length " + this.saveSymptomIdArray.push(this.sympId + ""));
    console.log("current array of symptom ids: " + this.saveSymptomIdArray);
    document.getElementById("permission").removeAttribute("hidden");

  }

  loadQuestions(){
    document.getElementById("questions").removeAttribute("hidden");
    document.getElementById("permission").setAttribute("hidden", "boolean");
    //this.getProposedSymptoms();
  }

  gender: string;
  genders = ["male", "female", "boy", "girl"];

  // ----------------------------------------------------------------------------------
  // Proposed Symptoms:

  isProposedClicked: boolean = false;

  proposedSymptoms: Symptom[] = [];
  age: number;

  getProposedSymptoms(){
    document.getElementById("questions").setAttribute("hidden", "boolean");
    document.getElementById("propSymps").removeAttribute("hidden");
    document.getElementById("startSymp").setAttribute("hidden", "boolean");
    // this.changeClicked();
    localStorage.setItem("CurrentGender", this.gender);
    localStorage.setItem("CurrentDateBirth", this.age+"");
    this.healthResultService.loadProposedSymptoms(parseInt(localStorage.getItem("sympId")), this.gender, this.age).subscribe((allProposedSymptoms) => {this.proposedSymptoms = allProposedSymptoms});
  }

  // changeClicked(){
  //   this.isProposedClicked = !this.isProposedClicked;
  // }

}

