import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'; // do not use selenium import!
import { HealthResultService } from '../services/health-result.service';
import { TokenForm } from '../token';
import { Account } from '../account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private healthResultService: HealthResultService, private router: Router) { }

  ngOnInit() {
    localStorage.setItem("isValidLogin","false");
  }

  user: string;
  key: string;
  createUser: string;
  createPass: string;

  allowAccess: boolean = false;

  sendLogin(): Observable<boolean> {
    let accepted = this.http.post<boolean>('http://salutem.us-east-2.elasticbeanstalk.com/accounts/login',
                     JSON.parse(`{"username":"${this.user}","key":"${this.key}"}`), {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json' 
      })

    }); // no error handling rn
    return accepted;
  }
  sendCreateAccount(): Observable<Account>{
    let accepted = this.http.post<Account>('http://salutem.us-east-2.elasticbeanstalk.com/accounts',
      JSON.parse(`{"username":"${this.createUser}","key":"${this.createPass}"}`), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })

      }); // no error handling rn
    return accepted;
  }

  grabAccount(): Observable<Account>{
    let accepted = this.http.post<Account>('http://salutem.us-east-2.elasticbeanstalk.com/accounts/grab',
      JSON.parse(`{"username":"${this.user}","key":"${this.key}"}`), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })

      }); // no error handling rn
    return accepted;
  }

  // localStorage cannot hold boolean values, so convert to string
  convertToStringForStorage(data: boolean): string {
    if (data) {
      this.allowAccess = true;

      // set the auth token in localStorage for session (DO THIS AFTER YOU VALIDATE THAT THEY CAN SIGN IN PROPERLY)
      localStorage.setItem("CurrentUser", this.user);

      let token: TokenForm;
      let tokenString: string;

      this.getTokenJSON()
      .subscribe(
        (data) => {
          (token = data)
          tokenString = data.Token;
          localStorage.setItem("CurrentUserToken", data.Token);
        }
      );
  
      tokenString = localStorage.getItem("CurrentUserToken").toString();

      return "true";
    } else {
      this.allowAccess = false;
      return "false";
    }
  }
  convertAccountToString(account:Account): string{
    
    var thisAccount: any=JSON.stringify(account);
    // thisAccount.pastSymptoms.forEach(number => {
    // });
    // stringAccount=`${thisAccount.accountId}`+ thisAccount.username+thisAccount.key;
    return thisAccount;
  } 

  checkLogin(){
    this.sendLogin() //change this to grab account 
    .subscribe(
      data => {
        if (data) {
          // alert("YOU SIGNED IN YAY!")
          localStorage.setItem("isValidLogin", "true");
          var signedInAcct: any=this.grabAccount().subscribe(account => {
            var thisAccount=this.convertAccountToString(account);
            localStorage.setItem("signedInAccount",thisAccount);
            
          });

          let token: TokenForm;
          let tokenString: string;

          this.getTokenJSON()
            .subscribe(
              (data) => {
                (token = data)
                tokenString = data.Token;
                localStorage.setItem("Token", data.Token);
              }
            );
           //try subscribing and getting info then
          
          //the following commands are not functioning
          // localStorage.setItem("AccountId",signedInAcct.accountId);
          // localStorage.setItem("AccountId", signedInAcct.username);
          // localStorage.setItem("AccountId", signedInAcct.key);
          
          // localStorage.setItem("isValidLogin", this.convertToStringForStorage(data));
          // console.log("this is the item: " + localStorage.getItem("isValidLogin"));
          // localStorage.setItem("AccountName", `${this.user}`);
          // localStorage.setItem("AcountPassword",`${this.key}`);
          this.router.navigateByUrl("/home");
        }
        else {
          alert("There is no account registered with those credentials");
          // localStorage.setItem("isValidLogin", this.convertToStringForStorage(data));
          // document.getElementById("incorrectUserKeyCombo").removeAttribute("hidden");
          this.router.navigateByUrl("/login");
          // console.log("this is the item: " + localStorage.getItem("isValidLogin"));
        }
      }
    );
  }

newAccount(){
  this.sendCreateAccount()
    .subscribe(
      data => {

        // let account: Account;
        var account: any=data;
        
        if (data) {
        // let strAccount=this.convertAccountToString(account);
          // localStorage.setItem("AccountId",`${account.accountId}`)
          // localStorage.setItem("AccountName", account.username);
          // localStorage .setItem("AcountPassword",account.key);
          alert("Thank you for making an account, please sign to use our service");
          this.router.navigateByUrl("/login");
          // localStorage.setItem("Account", strAccount);
          
          
        }
      }
    );
}

  getTokenJSON(): Observable<TokenForm> {
    let tokenTimeJSON = this.http.post<TokenForm>('https://authservice.priaid.ch/login', null, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer Pe8d2_GMAIL_COM_AUT:BmZ1xO4haXv5nJd/agjjgw==',// expired: Bearer Fo3a8_GMAIL_COM_AUT:/O0go1aHzJX3ZBqqHEsu3g==
        'Content-Type': 'application/json' // multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
      })
    }); // no error handling rn 
    return tokenTimeJSON;
  }




}
