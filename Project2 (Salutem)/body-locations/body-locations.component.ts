import { Component, OnInit } from '@angular/core';
import { BodyLocation } from '../body-location';
import { HealthResultService } from '../services/health-result.service';
import { BodySymptom, Symptom } from '../symptom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diagnosis } from '../diagnosis';
import { Observable } from 'rxjs';
import { Submission } from '../submission';
import { Account } from '../account';

@Component({
  selector: 'app-body-locations',
  templateUrl: './body-locations.component.html',
  styleUrls: ['./body-locations.component.css']
})
export class BodyLocationsComponent implements OnInit {

  constructor(private http:HttpClient, private healthResultService: HealthResultService) { }

  ngOnInit() {
    this.useAccount();
    this.healthResultService.loadBodyLocations().subscribe((allBodyLocations) => {this.bodyLocations = allBodyLocations});
    // document.getElementById("navIssue").setAttribute("disabled","");
    // document.getElementById("navPropos").setAttribute("disabled","");
    // document.getElementById("navSpec").setAttribute("disabled","");
    // document.getElementById("navDiagnosis").setAttribute("disabled","");
}
  diaDiv: boolean = false;
  diagnoses: Diagnosis[] = [];
  currentAccountId: number;

  bodyLocations: BodyLocation[] = [];
  bodySubLocations: BodyLocation[] = [];
  healthLocationIds: number[];

  // note: there are 1013 symptoms available
  userEnteredSymptoms: any[];

  bodyId: number;
  subBodyId: number;

  // must castHTMLElement as <HTMLInputElement> to use .value
  getBodyLocations(): number{
    if ((<HTMLInputElement>document.getElementById("bodyLocationSelector")).value === "choose")
      document.getElementById("bodySubLocationSelector").setAttribute("disabled", "boolean");
    else{
      document.getElementById("bodySubLocationSelector").removeAttribute("disabled");
      this.bodyId = parseInt((<HTMLInputElement>document.getElementById("bodyLocationSelector")).value);
      localStorage.setItem("bodyId", this.bodyId + "");
      console.log("bodyId" + this.bodyId);
      this.healthResultService.loadBodyLocation(this.bodyId)
          .subscribe((allBodyLocations) => {
              this.bodySubLocations = allBodyLocations;
              this.populateSubLocations();
            });
        }
        return this.bodyId;
  }

  // manipulating html, adding values dynamically from api call
  populateSubLocations() {
    if ((<HTMLInputElement>document.getElementById("bodyLocationSelector")).value != "choose"){
      let optionsList = document.getElementById("bodySubLocationSelector");
      console.log("optionslist:  " + JSON.stringify(optionsList));
      //this.subBodyId = parseInt((<HTMLInputElement>document.getElementById("bodySubLocationSelector")).value);
      //localStorage.setItem("subBodyId", this.subBodyId + "");
      //console.log(this.subBodyId);
      optionsList.innerHTML = "";
      this.bodySubLocations.forEach(element => {
        let tmpOption = document.createElement("option");
        tmpOption.setAttribute("value", element.ID + "");
        tmpOption.innerText = element.Name;
        optionsList.appendChild(tmpOption);
      });
    }
  }

  // getting and saving subBody values
  saveSubBodyLocation() {
    this.subBodyId = parseInt((<HTMLInputElement>document.getElementById("bodySubLocationSelector")).value);
    localStorage.setItem("subBodyId", this.subBodyId + "");
    console.log(this.subBodyId);
    document.getElementById("permission").removeAttribute("hidden");  
  }

  // ----------------------------------------------------------------------------------
  // Questions:

  // making sure user is okay with revealing age or gender
  loadQuestions(){
    document.getElementById("questions").removeAttribute("hidden");
    document.getElementById("permission").setAttribute("hidden", "boolean");
    //this.getBodySymptoms();
  }

  // ----------------------------------------------------------------------------------
  // Body Symptoms:

  isClicked: boolean = false;
  bodySymptoms: BodySymptom[] = [];
  bodySympId: number;
  saveBodySymptomIdArray: string[] = [];
  gender: string;
  genders = ["male", "female", "boy", "girl"];
  age: number;

  getBodySymptoms(){

    document.getElementById("bodySymptom").removeAttribute("hidden");
    document.getElementById("questions").setAttribute("hidden", "boolean");

    localStorage.setItem("CurrentGender", this.gender);
    localStorage.setItem("CurrentDateBirth", this.age + "");

    // document.getElementById("myButton").removeAttribute("disabled");
    this.healthResultService.loadBodySymptoms(parseInt(localStorage.getItem("subBodyId")), this.convertGender(this.gender))
    .subscribe((allBodySymptoms) => {
        this.bodySymptoms = allBodySymptoms;
        this.populateBodySymptoms(this.bodySymptoms)});

    console.log("gender entered: " + this.gender);
    console.log("converting gender to: " + this.convertGender(this.gender));
    console.log("the bodyId:  " + localStorage.getItem("bodyId"));
    console.log("the subBodyId:  " + localStorage.getItem("subBodyId"));
  }

  // where we actually add body symptoms dynamically
  populateBodySymptoms(bodySymps: BodySymptom[]) {
    let dataList = document.getElementById("bodySymptomSelector");
    dataList.innerHTML = "";
    bodySymps.forEach(item => {
      let tmpOption = document.createElement("option");
      tmpOption.setAttribute("value", item.ID + "");
      tmpOption.innerText = item.Name;
      dataList.appendChild(tmpOption);
    });
  }

  // saving body symptom info to localStorage
  saveBodySymptoms() {
    document.getElementById("bodySymptom").removeAttribute("hidden");
    this.bodySympId = parseInt((<HTMLInputElement>document.getElementById("bodySymptomSelector")).value);
    localStorage.setItem("bodySympId", this.bodySympId + "");
    console.log("the id from console " + this.bodySympId);
    console.log("The symptom id: " + localStorage.getItem("bodySympId"));

    // string array
    console.log("length " + this.saveBodySymptomIdArray.push(this.bodySympId + ""));
    console.log("current array of symptom ids: " + this.saveBodySymptomIdArray);
    this.getDiagnoses();
  }

  // changeClicked(){
  //   this.isClicked = !this.isClicked;
  // }

  // some of the api calls require that gender be numerical, others string
  convertGender(gen: string): number {
    if (gen == "male") {
      return 0;
    }
    if (gen == "female") {
      return 1;
    }
    if (gen == "boy") {
      return 2;
    }
    if (gen == "girl") {
      return 3;
    }
    else {
      return 0;
    }
  } // end convert gender

  // ----------------------------------------------------------------------------------
  // Diagnosis:

  // making sure some elements are visible again
  getDiagnoses() {
    document.getElementById("diagnosis").removeAttribute("hidden");
    let test:string;
    this.changeClicked();
    this.healthResultService.loadDiagnosis(this.saveBodySymptomIdArray.toString(), this.gender, this.age).subscribe((allDiagnoses) => {
      this.diagnoses = allDiagnoses;
    });
    document.getElementById("specialist").removeAttribute("hidden");
  }

  // sympArraytoString(){
  //   var result="";
  //   for (let sym of this.saveBodySymptomIdArray.){
  //     result=result+","+sym;
  //   }
  //   console.log(result);
  //   return result;
  // }

  changeClicked() {
    this.diaDiv = !this.diaDiv;
  }

  saveDiagnosis() {
    //document.getElementById("diagnosisList").removeAttribute("hidden");
    for (let entry of this.diagnoses) {
      console.log(entry.Issue.ID); // 1, "string", false
      this.saveArray(entry.Issue.ID);
    } 
  }

  saveArray(issueId: number): Observable<Submission> {
    let accepted = this.http.put<Submission>('http://salutem.us-east-2.elasticbeanstalk.com/submissions',
      // { "accountId": 1, "symptomId": 10, "submissionDate": "2017-04-02" }
      JSON.parse(`{ "accountId" : ${this.currentAccountId}, "symptomId" : ${issueId}, "submissionDate":"2018-01-02"}`), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }); // no error handling rn
    // console.log(issueId);
    console.log(`{ "accountId" : ${this.currentAccountId}, "symptomId" : ${issueId}, "submissionDate":"2018-01-02"}`);
    return accepted;
  }

  useAccount() {
    var currentAccount: any = Account;
    currentAccount = JSON.parse(localStorage.getItem("signedInAccount"));
    console.log(currentAccount);
    this.currentAccountId = currentAccount.accountId;
    console.log(this.currentAccountId)
    // localStorage.getItem("signedInAccount")
  }

}
