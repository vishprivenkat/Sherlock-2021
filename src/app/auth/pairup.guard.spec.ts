import { TestBed } from '@angular/core/testing';

import { PairupGuard } from './pairup.guard';

describe('PairupGuard', () => {
  let guard: PairupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PairupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
