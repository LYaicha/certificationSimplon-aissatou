
// import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DossierMedicService } from 'src/app/services/dossier-medic.service';
import { PatientService } from 'src/app/services/patient.service';
import { PSService } from 'src/app/services/ps.service';

@Component({
  selector: 'app-ajout-personel',
  templateUrl: './ajout-personel.component.html',
  styleUrls: ['./ajout-personel.component.css'],
})
export class AjoutPersonelComponent {
  dtOptions: DataTables.Settings = {};

  allPersSante: any[] = [];
  allDossierMedical: any[] = [];

  dossierMedicalPatient: any;


  constructor(
    private route: Router,
    private authservice: AuthService,
    private patientService: PatientService,
    private dossierMedical: DossierMedicService,
    private psService: PSService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    };

    this.getAllPS();
    this.getAllDossierMedical();
  }
  // getAllUSer() {
  //   this.patientService.getAllPatient().subscribe((response) => {
  //     this.allPatient = response.liste_des_utilisateurs;
  //   });
  // }


  getAllPS() {
    this.psService.getAllPersolleSante().subscribe((response) => {
      this.allPersSante = response.liste_des_;
    });
  }

  getAllDossierMedical() {
    this.dossierMedical.getDoMeds().subscribe((response) => {
      this.allDossierMedical = response.liste_des_dossiers_medicaux;
      console.log(this.allDossierMedical);
    });
  }

  getDossierMedical(idPatient: number) {
    this.dossierMedicalPatient = this.allDossierMedical.find(
      (elt: any) => elt.id_patient === idPatient
    );
    console.log(this.dossierMedicalPatient.information_de_utilisateur);
    console.log(this.dossierMedicalPatient.information_du_dossier_medical);
    console.log(idPatient);
    this.getPersonnelleSante(
      this.dossierMedicalPatient.information_du_dossier_medical
        .personnelsante_id
    );
  }

  priseEnChargePar: any;
  getPersonnelleSante(idPs: number) {
    this.psService.getAllPersolleSante().subscribe((response) => {
      const TabPs = response.liste_des_personnels_de_sante;
      this.priseEnChargePar = TabPs.find((elt: any) => elt.id === idPs);
      console.log(this.priseEnChargePar.user.nom);
    });
  }
  logout() {
    this.authservice.logout().subscribe((response: any) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }
}

