import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DossierMedicService } from 'src/app/services/dossier-medic.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-gestion-patientes',
  templateUrl: './gestion-patientes.component.html',
  styleUrls: ['./gestion-patientes.component.css']
})
export class GestionPatientesComponent  implements OnInit{
  dtOptions: DataTables.Settings = {};
  patient = {
    // Les propriétés du patient
  };

  constructor(private patientService: PatientService,  private route: Router,
    private authservice: AuthService, private dossierMedicalService:DossierMedicService) {}
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
    this.loadDossier();
  }

    // Les attributs
    nom:string = '';
    prenom:string = '';
    adresse:string = '';
    email:string = '';
    telephone:string = '';
    statut:string = '';
    poste_partum:string = '';
    poste_avortement:string = '';
    methode_choisie:string = '';
    methode_en_cours:string = '';
    raison_de_la_visite:string = '';
    effets_indesirables_complications:string = '';
    date_visite:string = '';
    date_prochain_rv:string = '';
    indication:string = '';
    personnelsante_id = '';
    numero_Identification:number=0;
    age:number=0;
    user_id:number=0;

    dossierMedicals:any [] =[];

    // loadDossier() {
    //   this.dossierMedicalService.getDoMeds().subscribe((data) => {
    //     // console.log('Données des produits:', data);
    //     this.dossierMedicals = data.ListeDesDossierMedical[0].dossier_medical;
    //     console.log('Données des produits:', this.dossierMedicals);
    //     // console.log('Données des produits:', data);
    //   });
    // }

    loadDossier() {
      this.dossierMedicalService.getDoMeds().subscribe((data) => {
        this.dossierMedicals = data.ListeDesDossierMedical;
        console.log('Données des produits:', this.dossierMedicals);
      });
    }


    AjoutPatient() {

      const token = localStorage.getItem('access_token');
         // Vérifier si le token est présent
      if (token) {
        // Décoder le token pour obtenir les informations utilisateur
        const tokenData = JSON.parse(atob(token.split('.')[1]));

        // Extraire l'ID de l'utilisateur à partir des informations du token
        const userId = tokenData.sub;
        this.user_id = userId,
        console.log('testetet',this.user_id);
        }

    // Utiliser l'ID de l'utilisateur dans la création du nouveau patient
        let newUser = {
          nom : this.nom,
          prenom : this.prenom,
          adresse : this.adresse,
          email : this.email,
          telephone : this.telephone,
          statut : this.statut,
          poste_partum : this.poste_partum,
          poste_avortement : this.poste_avortement,
          methode_choisie : this.methode_choisie,
          methode_en_cours : this.methode_en_cours,
          raison_de_la_visite : this.raison_de_la_visite,
          effets_indesirables_complications : this.effets_indesirables_complications,
          date_visite : this.date_visite,
          date_prochain_rv : this.date_prochain_rv,
          personnelsante_id : this.user_id,
          numero_Identification: this.numero_Identification,
          age: this.age,
          indication: this.indication
        };
        console.log(newUser);
        this.patientService.createPatient(newUser).subscribe(
          (response) => {
            this.patientService.alertMessage(
              'success',
              'Bravo!',
              'Message envoyer avec succés'
            );

          },
          (error) => {
            console.error(
              "Erreur lors de l'envoi du message:",
              error.error.message
            );
            this.patientService.alertMessage(
              'error',
              'Erreur!',
              error.error.message
            );
          }
        );
      }


  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }
}

