import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent {
  constructor(
    private route: Router,
    private authservice: AuthService,
  ) {}
  // attributs

showTable: boolean = true;
dtOptions: any;


  // methodes
  switchForm() {
    this.showTable = !this.showTable;
  }

  logout() {
    this.authservice.logout().subscribe((response: any) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }

}
