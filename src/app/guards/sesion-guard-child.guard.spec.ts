import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { sesionGuardChildGuard } from './sesion-guard-child.guard';

describe('sesionGuardChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sesionGuardChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
