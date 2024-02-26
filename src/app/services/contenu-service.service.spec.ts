import { TestBed } from '@angular/core/testing';

import { ContenuServiceService } from './contenu-service.service';

describe('ContenuServiceService', () => {
  let service: ContenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
