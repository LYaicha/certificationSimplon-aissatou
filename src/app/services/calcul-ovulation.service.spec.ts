import { TestBed } from '@angular/core/testing';

import { CalculOvulationService } from './calcul-ovulation.service';

describe('CalculOvulationService', () => {
  let service: CalculOvulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculOvulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
