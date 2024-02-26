import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const accesToken = localStorage.getItem('access_token');
    console.log(accesToken);
    
    // Vérifier si l'utilisateur est authentifié
    if (accesToken) {
      return true;
    } else {
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
