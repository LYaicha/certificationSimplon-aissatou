import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleCalendarService } from 'src/app/services/google-calendar-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-gestion-rv',
  templateUrl: './gestion-rv.component.html',
  styleUrls: ['./gestion-rv.component.css']
})
export class GestionRVComponent  implements OnInit{
  dtOptions: DataTables.Settings = {};
  constructor( private route: Router,
    private authservice: AuthService,) { }
  ngOnInit(): void {
   
  }

  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      localStorage.removeItem('access_token');

      this.route.navigate(['/accueil']);
    });
  }

}
