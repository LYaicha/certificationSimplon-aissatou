import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DossierMedicService } from 'src/app/services/dossier-medic.service';
import { PatientService } from 'src/app/services/patient.service';
import { PSService } from 'src/app/services/ps.service';

@Component({
  selector: 'app-liste-patientes-admin',
  templateUrl: './liste-patientes-admin.component.html',
  styleUrls: ['./liste-patientes-admin.component.css'],
})
export class ListePatientesAdminComponent {
  dtOptions: DataTables.Settings = {};

  allPatient: any[] = [];
  allDossierMedical: any[] = [];

  dossierMedicalPatient: any;
  http: any;
  router: any;

  constructor(
    private patientService: PatientService,
    private dossierMedical: DossierMedicService,
    private psService: PSService,
    private route: Router,
    private authservice: AuthService,
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

    this.getAllUSer();
    this.getAllDossierMedical();
  }

  getAllUSer() {
    this.patientService.getAllPatient().subscribe((response) => {
      this.allPatient = response.liste_des_utilisateurs;
    });
  }

  getAllDossierMedical() {
    this.dossierMedical.getDoMedsAdmin().subscribe((response) => {
      this.allDossierMedical = response.Liste_des_dossiers_medicaux;
      console.log(this.allDossierMedical);
    });
  }

  getDossierMedical(idPatient: number) {
   this.dossierMedical.getDoMedDetailAdmin(idPatient).subscribe(
    (data: any)=>{

      this.dossierMedicalPatient = data.liste_des_details_dossier_medical;
      console.log(this.dossierMedicalPatient);

    })
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
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }
}
