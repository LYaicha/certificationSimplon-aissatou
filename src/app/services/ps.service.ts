import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class PSService {

  constructor(private http: HttpClient) { }

  userConnect(accessToken: any){
    // return this.http.post<any>(`${apiUrl}/auth/me`, accessToken)
    return accessToken ? this.http.post<any>(`${apiUrl}/auth/me`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }

  getAllPersolleSante(){
    return this.http.get<any>(`${apiUrl}/liste_personnelsante`);
  }
  getPersolleSanteValid(){
    return this.http.get<any>(`${apiUrl}/liste_personnelsante_valide`);
  }

  validerPS(id: number): Observable<any> {
    return this.http.put<any>(`${apiUrl}/valider/${id}`, {});
  }

  invaliderPS(id: number): Observable<any> {
    return this.http.put<any>(`${apiUrl}/invalider/${id}`,{});
  }
}
