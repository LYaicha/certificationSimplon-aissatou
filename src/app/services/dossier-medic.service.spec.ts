import { TestBed } from '@angular/core/testing';

import { DossierMedicService } from './dossier-medic.service';

describe('DossierMedicService', () => {
  let service: DossierMedicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierMedicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
