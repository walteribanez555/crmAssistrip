import { TestBed } from '@angular/core/testing';

import { ReembolsosService } from './reembolsos.service';

describe('ReembolsosService', () => {
  let service: ReembolsosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReembolsosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
