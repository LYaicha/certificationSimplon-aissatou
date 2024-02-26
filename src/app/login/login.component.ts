import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
export const emailValidator = Validators.pattern(
  '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
);
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
password: any;
email: any;
  constructor(private router: Router, private authService: AuthService) {}

  // attributs
  showForm: boolean = true;
  nom: string = '';
  telephone: string = '';
  image: string = '';
  matricule: string = '';
  structure: string = '';
  Service: string = '';

  emailConnexion: string = '';
  passwordConnexion: string = '';
  error!: string;
   // Variables Si les valeurs sont exactes
   exactEmailCon : boolean = false;
   exactPasswordCon : boolean = false; 
     // Variables si les champs sont exacts
   exactEmail : boolean = false;
   exactPassword : boolean = false;

   verifEmail : String = "";
   verifPassword : String = "";

  //Methodes
  // pour switcher entre les formulaires de connexion et de connexion
  switchForm() {
    this.showForm = !this.showForm;
  }

  // methode pour la connexion
  
// methode pour la connexion
login() {

  // Vérifier si les champs sont vides
  this.verifEmailFonction();
  this.verifPasswordFonction();
  const data = {
  email: this.email,
  password: this.password,
  };
  // ici on appel le service puis on decript le token pour avoir l'object
  this.authService.login(data).subscribe((response) => {
  // console.log(response);
  localStorage.setItem(
  'access_token',
  JSON.stringify(response.access_token).replace(/['"]+/g, '')
  );
 // a partir de l'objet obtenu on peut obtenir le role
      this.authService
        .userConnect(localStorage.getItem('access_token'))
        .subscribe((user) => {
          console.log('role',user.role);
          if (user.role == 'admin') {
            this.router.navigate(['dashboard']);
          } else if (user.role == 'personnelsante') {
            this.router.navigate(['gestionRVPS']);
          } else if (user.role == 'utilisateur') {
            this.router.navigate(['monCycle']);
          }
        });
      console.log(response.access_token);
    });
  
  }

  viderChamps(){
    this.email = "";
    this.password = "";
    this.exactEmail = false;
    this.exactPassword = false;
  }

  verifEmailFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;
    
    if(this.email == ""){
      this.verifEmail = "Veuillez renseigner votre email";
    }
    else if (!this.email.match(emailPattern) ){
      this.verifEmail = "Veuillez donner un email valide";
    }
    else {
      this.verifEmail = "";
      this.exactEmail = true;
    }
  }

    // Verification du mot de passe 
    verifPasswordFonction(){
      this.exactPassword = false;
      if(this.password == ""){
        this.verifPassword = "Veuillez renseigner votre mot de passe";
      }
      else if (this.password.length < 5 ){
        this.verifPassword = "Mot de passe doit être supérieur ou égal à 5";
      }
      else{
        this.verifPassword = "";
        this.exactPassword = true;
      }
    }
}
