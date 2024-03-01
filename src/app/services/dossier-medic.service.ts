import { apiUrl } from './apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierMedicService {

  constructor(private http: HttpClient) { }

  userConnect(accessToken: any){
    // return this.http.post<any>(`${apiUrl}/auth/me`, accessToken)
    return accessToken ? this.http.post<any>(`${apiUrl}/auth/me`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }

  getDoMeds(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listes_totale_DM`);
  }

  getDoMedsAdmin(): Observable<any>{
    return this.http.get<any>(`${apiUrl}/listes_generale_DM`);
  }

  getDoMedDetailAdmin(id: number): Observable<any>{
    return this.http.get<any>(`${apiUrl}/Detail_DM/${id}`);
  }

  getDoMed(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  addDoMed(DM: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/enregistrer_Dossier_Medical`, DM);
  }

  updateDoMed(dossier_Medical: number, DM: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/update_DM/${dossier_Medical}`,DM);
  }

  deleteDoMed(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/archiver_DM/${id}`);
  }
}

