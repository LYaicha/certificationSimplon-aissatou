import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private apiEndpoint = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  private accessToken = 'VOTRE_JETON_ACCES';

  constructor(private http: HttpClient) { }

  addEventToCalendar(eventData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken,
      'Content-Type': 'application/json'
    });

    const event = {
      summary: eventData.summary,
      start: {
        dateTime: eventData.startDateTime
      },
      end: {
        dateTime: eventData.endDateTime
      }
    };

    return this.http.post(this.apiEndpoint, event, { headers });
  }
}