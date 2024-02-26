import { TestBed } from '@angular/core/testing';

import { PSService } from './ps.service';

describe('PSService', () => {
  let service: PSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
