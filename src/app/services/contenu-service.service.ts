// import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ContenuServiceService {

  constructor( private http:HttpClient,) { }

  userConnect(accessToken: any){
    // return this.http.post<any>(`${apiUrl}/auth/me`, accessToken)
    return accessToken ? this.http.post<any>(`${apiUrl}/auth/me`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }

  getContenu(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/liste_ressource`);
  }

  getContenuById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/detail_ressource/${id}`);
  }

  addContenu(contenu: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/create_ressource`, contenu);
  }

  updateContenu(id: number, contenu: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/update_ressource/${id}`, contenu);
  }

  deleteContenu(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/supprimer_ressource/${id}`);
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 900,
    });
  }
}


