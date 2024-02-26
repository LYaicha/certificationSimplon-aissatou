import { apiUrl } from './apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  userConnect(accessToken: any){
    // return this.http.post<any>(`${apiUrl}/auth/me`, accessToken)
    return accessToken ? this.http.post<any>(`${apiUrl}/auth/me`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }

  getForums(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/liste_forum`);
  }

  getForum(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  addForum(forum: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/create_forum`, forum);
  }

  updateForum(id: number, forum: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/update_forum/{forum_Communication}${id}`, forum);
  }

  deleteForum(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }
}
