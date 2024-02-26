import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContenuServiceService } from 'src/app/services/contenu-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-contenu',
  templateUrl: './gestion-contenu.component.html',
  styleUrls: ['./gestion-contenu.component.css']
})
export class GestionContenuComponent {
  contenus: any[] = [];
  contenuForm!: FormGroup;
  ContenueditForm!: FormGroup; // Formulaire pour la modification
  selectedContenuId:any = {};
  image:string = "";
  titre:string = "";
  texte:string = "";
  file: any;


  constructor(
    private route: Router,
    private authservice: AuthService,
    private contenuService: ContenuServiceService,
    private fb: FormBuilder,
    private http: HttpClient

  ) {
    this.contenuForm= this.fb.group({
      titre: ['', Validators.required],
      texte: ['', Validators.required],
      image: [''],
    });

    this.ContenueditForm = this.fb.group({
      titre: ['', Validators.required],
      texte: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getContenu();
  }





  onchange(event: any) {
    console.log(event.target.files);

    this.file = event.target.files[0];
  }

// fonction pour ajouter
  submitForm(){
    const formData = new FormData();
        formData.append('titre', this.contenuForm.value.titre);
        formData.append('texte', this.contenuForm.value.texte);
        formData.append('image', this.file);

        this.contenuService.addContenu(formData).subscribe(
          (response) => {
            console.log(response);
            // Gérer la réponse de l'ajout
            // ...
            this.contenus.unshift(this.contenuForm.value)
            // this.resetForm();
            this.getContenu();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du forum :', error);
          }
        );
  }

    // fonction qui permet de modifier

    ModifierContenu() {
      const formData = new FormData();
      formData.append('image', this.file);
      const data = {
        titre: this.titre,
        texte: this.texte,
        image: this.image
      }

      console.log('je suis le titre',data);
      this.contenuService.updateContenu(this.selectedContenuId, data).subscribe(
        (response) => {
          // La mise à jour a réussi, faire quelque chose si nécessaire
          console.log('La ressource a été mise à jour avec succès :', response);
          this.getContenu(); // Mettre à jour la liste des ressources après la modification
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
        },
        (error) => {
          // Une erreur s'est produite lors de la mise à jour
          console.error('Erreur lors de la mise à jour de la ressource :', error);
          // Gérer l'erreur ou afficher un message à l'utilisateur
        }
        );
        console.log('je suis le formdata',formData);
    }


  chargerInfoContenu(contenu: any) {
    this.selectedContenuId = contenu.id;
    this.contenuForm.patchValue({
      titre: contenu.titre,
      // image: forum.image,
      texte: contenu.texte,

    });
    console.log("contenue a modifier", this.contenuForm);
  }

  getContenu(): void {
    this.contenuService.getContenu().subscribe(
      (response) => {
        if ('liste_des_ressources' in response) {
          this.contenus = response.liste_des_ressources.reverse();
        }
        console.log('contenus',this.contenus);
        // console.log(response);
      },
      (error) => {
        console.error('Erreur lors de la récupération des forums :', error);
      }
    );
  }

  getDetailContenue(contenu: any) {
    this.selectedContenuId = contenu;
  }

  SupprimerContenue(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:  '#E75761',
      cancelButtonColor: '#C5C7A7',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contenuService.deleteContenu(id).subscribe(() => {
          this.contenuService.alertMessage(
            'success',
            'Supprimé!',
            'Produit supprimé avec succès'
          );
          this.getContenu();
        });
      }
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

