import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { IssuesComponent } from './issues/issues.component';
import { SpecialisationsComponent } from './specialisations/specialisations.component';
// import { IssueComponent } from './issue/issue.component';
// import { ProposedSymptomsComponent } from './proposed-symptoms/proposed-symptoms.component';
import { BodyLocationsComponent } from './body-locations/body-locations.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { RedflagComponent } from './redflag/redflag.component';
// import { BodySymptomsComponent } from './body-symptoms/body-symptoms.component';
import { HealthResultService } from './services/health-result.service';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './routes';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    AppComponent,
    SymptomsComponent,
    IssuesComponent,
    SpecialisationsComponent,
    // IssueComponent,
    // ProposedSymptomsComponent,
    BodyLocationsComponent,
    DiagnosisComponent,
    RedflagComponent,
    // BodySymptomsComponent,
    LoginComponent,
    HomePageComponent,
    NavComponent,
    // DashboardComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HealthResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
