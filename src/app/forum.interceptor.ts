import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ForumInterceptor implements HttpInterceptor {
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token'); // Récupérez le token d'authentification depuis votre service ou un autre emplacement
    console.log(token);
    
    if (token) {
      // Vérifiez si la requête est destinée à l'API de forum
        // if (request.url.includes('/forums')) {
        request = request.clone({
            setHeaders: {
            Authorization: `Bearer ${token}` // Ajoutez le token aux en-têtes de la requête
            }
        });
        // }
    }

    return next.handle(request);
    }
}