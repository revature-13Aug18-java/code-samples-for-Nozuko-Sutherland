import { Component, OnInit } from '@angular/core';
import { HealthResultService } from '../services/health-result.service';
import { Specialisation } from '../specialisation';

@Component({
  selector: 'app-specialisations',
  templateUrl: './specialisations.component.html',
  styleUrls: ['./specialisations.component.css']
})
export class SpecialisationsComponent implements OnInit {

  constructor(private healthResultService: HealthResultService) { }

  ngOnInit() {
  }

  isClicked: boolean = false;
  specialisations: Specialisation[] = [];
  symptomId: number;
  gender: string;
  age: number;

  getSpecialisations(){
    this.healthResultService.loadSpecialisations(parseInt(localStorage.getItem("bodySympId")), localStorage.getItem("CurrentGender"), parseInt(localStorage.getItem("CurrentDateBirth")))
    .subscribe((allSpecialisations) => {this.specialisations = allSpecialisations;
      });
    }
}
