import { TestBed } from '@angular/core/testing';

import { PairupService } from './pairup.service';

describe('PairupService', () => {
  let service: PairupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PairupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
