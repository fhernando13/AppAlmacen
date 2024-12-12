import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { storerGuard } from './storer.guard';

describe('storerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => storerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
