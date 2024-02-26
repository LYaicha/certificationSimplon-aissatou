import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // private baseUrl = '/api/patients';


  constructor(private http: HttpClient) {}

  createPatient(patientData: any): Observable<any> {
    return this.http.post('${this.apiUrl}', patientData);
  }

  getAllPatient(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/liste_utilisateur`);
  }
}