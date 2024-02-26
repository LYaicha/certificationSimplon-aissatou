import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gestion-contenu',
  templateUrl: './gestion-contenu.component.html',
  styleUrls: ['./gestion-contenu.component.css']
})
export class GestionContenuComponent {

  constructor(
    private route: Router,
    private authservice: AuthService,
    
  ) {}
  // Gestion bouton
  boutonActif = 1;

  // Initialiser le contenu actuel
  currentContent: string = 'all';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId; 
  }
  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }

}

