import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CalculOvulationService } from 'src/app/services/calcul-ovulation.service';

@Component({
  selector: 'app-mon-cycle',
  templateUrl: './mon-cycle.component.html',
  styleUrls: ['./mon-cycle.component.css'],
})
export class MonCycleComponent {
  // attributs
  CalculPOs!: any[];
  CalculPO!: {
    dateRegles: '';
    dureeCycle: '';
    disabled: boolean;
  };
  dateEstimeeOvulation: string = '';
  periodeFertiliteEstimee: string = '';

  calculPOForm!: FormGroup;
  localStorage: any;
  constructor(
    private calculOvulationService: CalculOvulationService,
    private fb: FormBuilder,
    private route: Router,
    private authservice: AuthService
  ) {
    this.CalculPOs = [];

    this.calculPOForm = this.fb.group({
      dateRegles: ['', Validators.required],
      dureeCycle: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.dateEstimeeOvulation =
      localStorage.getItem('dateEstimeeOvulation') || '';
    this.periodeFertiliteEstimee =
      localStorage.getItem('periodeFertiliteEstimee') || '';
  }

  submitForm() {
    console.log(this.calculPOForm.value);
    const POData = new FormData();
    POData.append('dateRegles', this.calculPOForm.value.dateRegles);
    POData.append('dureeCycle', this.calculPOForm.value.dureeCycle);
    console.log(POData);
    console.log(this.calculPOForm);

    this.calculOvulationService
      .calPeriodeOvulation(POData)
      .subscribe((response) => {
        console.log(response);
        this.CalculPOs.unshift(this.calculPOForm.value);

        this.calculOvulationService
          .calPeriodeOvulation(POData)
          .subscribe((response: any) => {
            console.log(response);
            if (
              'date_estimee_de_votre_ovulation' in response &&
              'votre_periode_de_fertilite_estimee' in response
            ) {
              this.dateEstimeeOvulation =
                response.date_estimee_de_votre_ovulation;
              this.periodeFertiliteEstimee =
                response.votre_periode_de_fertilite_estimee;
            }
          });
        // Stockage des valeurs dans le local storage
      });
  }

  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }
}
