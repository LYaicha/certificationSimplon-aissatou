import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{

  
  ngOnInit() {
  }
  constructor(private router: Router) { }
  navigateToAccueil() {
    this.router.navigate(['accueil'], { fragment: 'weddingHome' });
    this.router.navigate(['accueil'], { fragment: 'weddingAbout' });


  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
