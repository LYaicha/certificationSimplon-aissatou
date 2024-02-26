import { TestBed } from '@angular/core/testing';

import { GoogleCalendarService } from './google-calendar-service.service';

describe('GoogleCalendarServiceService', () => {
  let service: GoogleCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
