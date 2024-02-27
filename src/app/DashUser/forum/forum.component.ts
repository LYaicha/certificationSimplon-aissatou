import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  forums: any[] = [];
  forumForm!: FormGroup;
  editForm!: FormGroup; // Formulaire pour la modification
  // selectedForumId!: number;
  selectedForumId:any = {};
  file: any;
  blocChoice = 0;
  image: any;
  texte: any;
  titre: any;

  changeBloc(choice: any) {
    this.blocChoice = choice;
  }


  constructor(private forumService: ForumService, private fb: FormBuilder,
    private route: Router,
    private authservice: AuthService) {
    this.forumForm = this.fb.group({
      titre: ['', Validators.required],
      texte: ['', Validators.required],
      image: [''],
    });

    this.editForm = this.fb.group({
      titre: ['', Validators.required],
      texte: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getForums();
  }
    // Attribut pour la pagination
   forumParPage = 3; // Nombre d'projet par page
   pageActuelle = 1; // Page actuelle
// Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.forums.length / this.forumParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.forums.length / this.forumParPage);
  }
// Méthode pour déterminer les articles à afficher sur la page actuelle
    getArticlesPage(): any[] {
      const indexDebut = (this.pageActuelle - 1) * this.forumParPage;
      const indexFin = indexDebut + this.forumParPage;
      return this.forums.slice(indexDebut, indexFin);
    }
  submitForm(){
    const formData = new FormData();
        formData.append('titre', this.forumForm.value.titre);
        formData.append('texte', this.forumForm.value.texte);
        formData.append('image', this.file);

        this.forumService.addForum(formData).subscribe(
          (response) => {
            // console.log(response);
            // Gérer la réponse de l'ajout
            // ...
            this.forums.unshift(this.forumForm.value)
            this.blocChoice = 0
            this.resetForm();
            this.getForums();
          },
          (error) => {
            // console.error('Erreur lors de l\'ajout du forum :', error);
          }
        );
  }
  getDetailForum(forum: any) {
    this.selectedForumId = forum;
  }


  ModifierForum() {
    const formData = new FormData();
    formData.append('image', this.file);
    const data = {
      titre: this.titre,
      texte: this.texte,
      // image: this.image
    }

    console.log(data);
    this.forumService.updateForum(this.selectedForumId, data).subscribe(
      (response) => {
        // La mise à jour a réussi, faire quelque chose si nécessaire
        console.log('La ressource a été mise à jour avec succès :', response);
        this.getForums(); // Mettre à jour la liste des ressources après la modification
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


  SupprimerForum(id: number) {
    console.log('je suis id',id);
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
        this.forumService.deleteForum(id).subscribe(() => {
          console.log('je suis id',id);
          this.forumService.alertMessage(
            'success',
            'Supprimé!',
            'Produit supprimé avec succès'
          );
          this.getForums();
        });
      }
    });
    console.log('je suis id',id);

  }



  getForums(): void {
    this.forumService.getForums().subscribe(
      (response) => {
        if ('forums' in response) {
          this.forums = response.forums.reverse();
        }
        console.log('forums',this.forums);
        console.log(response);
      },
      (error) => {
        console.error('Erreur lors de la récupération des forums :', error);
      }
    );
  }

  onchange(event: any) {
    console.log(event.target.files);

    this.file = event.target.files[0];
  }

  editForum(forum: any) {
    this.selectedForumId = forum.id;
    this.editForm.patchValue({
      titre: forum.titre,
      // image: forum.image,
      texte: forum.texte,

    });
    console.log("forumM", this.editForm);
  }

  resetForm() {
    this.forumForm.reset();
    this.editForm.reset();
    this.selectedForumId;
  }

  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }
}
