import { TestBed } from '@angular/core/testing';

import { AlarmasService } from './alarmas.service';

describe('AlarmasService', () => {
  let service: AlarmasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
