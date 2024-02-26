import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculOvulationService {

  constructor(private http: HttpClient) { }
  userConnect(accessToken: any){
    // return this.http.post<any>(`${apiUrl}/auth/me`, accessToken)
    return accessToken ? this.http.post<any>(`${apiUrl}/auth/me`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }
  // calPeriodeOvulation(POData: any): Observable<any[]> {
  //   return this.http.post<any[]>(`${apiUrl}/calculer_periode_ovulation`);
  // }
  calPeriodeOvulation(POData: any): Observable<any[]> {
    return this.http.post<any[]>(`${apiUrl}/calculer_periode_ovulation`, POData, { responseType: 'json' });
  }
}
