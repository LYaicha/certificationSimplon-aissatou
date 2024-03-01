import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DossierMedicService } from 'src/app/services/dossier-medic.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-patientes',
  templateUrl: './gestion-patientes.component.html',
  styleUrls: ['./gestion-patientes.component.css'],
})
export class GestionPatientesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  patient = {
    // Les propriétés du patient
  };

  constructor(
    private patientService: PatientService,
    private route: Router,
    private authservice: AuthService,
    private dossierMedicalService: DossierMedicService
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
    this.loadDossier();
  }

  // Les attributs
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  email: string = '';
  telephone: string = '';
  statut: string = '';
  poste_partum: string = '';
  poste_avortement: string = '';
  methode_choisie: string = '';
  methode_en_cours: string = '';
  raison_de_la_visite: string = '';
  effets_indesirables_complications: string = '';
  date_visite: string = '';
  date_prochain_rv: string = '';
  indication: string = '';
  personnelsante_id = '';
  numero_Identification: number = 0;
  age: number = 0;
  user_id: number = 0;

  //les attributPourLaModfodification
  // Les attributs
  nomUpdate: string = '';
  prenomUpdate: string = '';
  adresseUpdate: string = '';
  emailUpdate: string = '';
  telephoneUpdate: string = '';
  statutUpdate: string = '';
  poste_partumUpdate: string = '';
  poste_avortementUpdate: string = '';
  methode_choisieUpdate: string = '';
  methode_en_coursUpdate: string = '';
  raison_de_la_visiteUpdate: string = '';
  effets_indesirables_complicationsUpdate: string = '';
  date_visiteUpdate: string = '';
  date_prochain_rvUpdate: string = '';
  indicationUpdate: string = '';
  personnelsante_idUpdate = '';
  numero_IdentificationUpdate: number = 0;
  ageUpdate: number = 0;
  user_idUpdate: number = 0;

  dossierMedicals: any[] = [];
  selectedDossierId: any = {};

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
      // console.log('Données des produits:', this.dossierMedicals);
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
      (this.user_id = userId), console.log('testetet', this.user_id);
    }

    // Obtenez la date actuelle au format "YYYYMMDD"
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    // Générez un nombre aléatoire à 5 chiffres
    const randomNum = Math.floor(Math.random() * 900) + 100;

    // Concaténez les différentes parties pour former le numéro de patient
    const numeroPatient = 'pat' + currentDate + randomNum;

    // console.log(numeroPatient);

    // Utiliser l'ID de l'utilisateur dans la création du nouveau patient
    let newUser = {
      nom: this.nom,
      prenom: this.prenom,
      adresse: this.adresse,
      email: this.email,
      telephone: this.telephone,
      statut: this.statut,
      poste_partum: this.poste_partum,
      poste_avortement: this.poste_avortement,
      methode_choisie: this.methode_choisie,
      methode_en_cours: this.methode_en_cours,
      raison_de_la_visite: this.raison_de_la_visite,
      effets_indesirables_complications: this.effets_indesirables_complications,
      date_visite: this.date_visite,
      date_prochain_rv: this.date_prochain_rv,
      personnelsante_id: this.user_id,
      numero_Identification: numeroPatient,
      age: this.age,
      indication: this.indication,
    };
    console.log(newUser);
    this.patientService.createPatient(newUser).subscribe((response) => {
      this.loadDossier();
      this.patientService.alertMessage(
        'success',
        'Bravo!',
        'Dossier ajouté avec succés!'
      );

      this.nom = '';
      this.prenom = '';
      this.adresse = '';
      this.email = '';
      this.telephone = '';
      this.statut = '';
      this.poste_partum = '';
      this.poste_avortement = '';
      this.methode_choisie = '';
      this.methode_en_cours = '';
      this.raison_de_la_visite = '';
      this.effets_indesirables_complications = '';
      this.date_visite = '';
      this.date_prochain_rv = '';
      this.indication = '';
      this.personnelsante_id = '';
      this.numero_Identification = 0;
      this.age = 0;
      this.user_id = 0;
    });
  }

  getDetailDoM(dossier: any) {
    this.selectedDossierId = dossier;
    console.log('je sui', dossier);
  }

  ModifierDossier() {
    const token = localStorage.getItem('access_token');
    // Vérifier si le token est présent
    if (token) {
      // Décoder le token pour obtenir les informations utilisateur
      const tokenData = JSON.parse(atob(token.split('.')[1]));

      // Extraire l'ID de l'utilisateur à partir des informations du token
      const userId = tokenData.sub;
      (this.user_id = userId), console.log('testetet', this.user_id);
    }

    // Utiliser l'ID de l'utilisateur dans la création du nouveau patient
    let dossierAModifier = {
      nom: this.nomUpdate,
      prenom: this.prenomUpdate,
      adresse: this.adresseUpdate,
      email: this.emailUpdate,
      telephone: this.telephoneUpdate,
      statut: this.statutUpdate,
      poste_partum: this.poste_partumUpdate,
      poste_avortement: this.poste_avortementUpdate,
      methode_choisie: this.methode_choisieUpdate,
      methode_en_cours: this.methode_en_coursUpdate,
      raison_de_la_visite: this.raison_de_la_visiteUpdate,
      effets_indesirables_complications:
        this.effets_indesirables_complicationsUpdate,
      date_visite: this.date_visiteUpdate,
      date_prochain_rv: this.date_prochain_rvUpdate,
      personnelsante_id: this.user_idUpdate,
      numero_Identification: this.numero_IdentificationUpdate,
      age: this.ageUpdate,
      indication: this.indicationUpdate,
    };

    console.log(dossierAModifier, 'donnée remplie');
    this.dossierMedicalService
      .updateDoMed(this.selectedDossierId, dossierAModifier)
      .subscribe((response) => {
        // La mise à jour a réussi, faire quelque chose si nécessaire
        console.log('La ressource a été mise à jour avec succès :', response);
        this.getDetailDoM(this.dossierMedicals); // Mettre à jour la liste des ressources après la modification
        // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires

        this.loadDossier();
      });
    console.log('je suis le formdata', dossierAModifier);
    this.patientService.alertMessage(
      'success',
      'Bravo!',
      'Dossier modifié avec succes!'
    );
  }

  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }

  chargerInfosDM(dossier: any) {
    this.selectedDossierId = dossier.dossier_medical.id;
    console.log('novysvd', dossier);
    this.nomUpdate = dossier.dossier_medical.nom;
    this.prenomUpdate = dossier.dossier_medical.prenom;
    this.adresseUpdate = dossier.dossier_medical.adresse;
    this.emailUpdate = dossier.dossier_medical.email;
    this.telephoneUpdate = dossier.dossier_medical.telephone;
    this.statutUpdate = dossier.dossier_medical.statut;
    this.poste_partumUpdate = dossier.dossier_medical.poste_partum;
    this.poste_avortementUpdate = dossier.dossier_medical.poste_avortement;
    this.methode_choisieUpdate = dossier.dossier_medical.methode_choisie;
    this.methode_en_coursUpdate = dossier.dossier_medical.methode_en_cours;
    this.raison_de_la_visiteUpdate =
      dossier.dossier_medical.raison_de_la_visite;
    this.effets_indesirables_complicationsUpdate =
      dossier.dossier_medical.effets_indesirables_complications;
    this.date_visiteUpdate = dossier.dossier_medical.date_visite;
    this.date_prochain_rvUpdate = dossier.dossier_medical.date_prochain_rv;
    this.user_idUpdate = dossier.dossier_medical.user_id;
    this.numero_IdentificationUpdate =
      dossier.dossier_medical.numero_Identification;
    this.ageUpdate = dossier.dossier_medical.age;
    this.indicationUpdate = dossier.dossier_medical.indication;
  }

  supprimer(id: number) {
    Swal.fire({
      title: 'Voulez vous supprimer ce dossier?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E75761',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dossierMedicalService.deleteDoMed(id).subscribe((data) => {
          console.log(data);
          this.loadDossier();
        });
        Swal.fire({
          title: 'Supprimé!',
          text: 'Dossier medical supprimé avec succes',
          icon: 'success',
        });
      }
    });
  }
}
