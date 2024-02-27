import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { apiUrl } from './apiUrl';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // private baseUrl = '/api/patients';


  constructor(private http: HttpClient) {}

  createPatient(patientData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/enregistrer_Dossier_Medical`, patientData);
  }

  getAllPatient(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/liste_utilisateur`);
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
