import { Component, OnInit } from '@angular/core';
import { HealthResultService } from '../services/health-result.service';
import { Diagnosis } from '../diagnosis';
import { Issue} from '../diagnosis';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Submission } from '../submission';
import { Account } from '../account';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  constructor(private http: HttpClient, private healthResultService: HealthResultService) { }

  ngOnInit() {
    this.useAccount();
  }

  isClicked: boolean = false;

  diagnoses: Diagnosis[] = [];
  
  //specialisations: Spec[] = [];
  objectkeys = Object.keys;
  id: string;
  symptomId: number;
  gender: string;
  age: number;

  //account variable
  currentAccountId: number;


  getDiagnoses(){
    // this.symptomId = parseInt(localStorage.getItem("sympId"));
    // this.gender = localStorage.getItem("CurrentGender");
    // this.age = parseInt(localStorage.getItem("CurrentDateBirth")); // birth year
    this.changeClicked();
    //console.log(Diagnosis);
    this.healthResultService.loadDiagnosis(this.id, this.gender, this.age).subscribe((allDiagnoses) => {
      this.diagnoses = allDiagnoses;

      
      // this.saveArray(allDiagnoses);
    });
    //this.healthResultService.loadDiagnosis(this.id, this.gender, this.age).subscribe((allSpecialisations) => {this.specialisations = allSpecialisations});
  
  }

  changeClicked(){
    this.isClicked = !this.isClicked;
  }

  saveDiagnosis(){
    for (let entry of this.diagnoses) {
      console.log(entry.Issue.ID); // 1, "string", false
      this.saveArray(entry.Issue.ID);
    }
    
  }


  saveArray(issueId: number):Observable<Submission>{
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

useAccount(){
  var currentAccount: any= Account;
  currentAccount = JSON.parse(localStorage.getItem("signedInAccount"));
  console.log(currentAccount);
  this.currentAccountId=currentAccount.accountId;
  console.log(this.currentAccountId)
  // localStorage.getItem("signedInAccount")
}

}