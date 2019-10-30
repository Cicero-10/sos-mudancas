import { TestBed } from '@angular/core/testing';

import { PrestadorService } from './prestador.service';

describe('PrestadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestadorService = TestBed.get(PrestadorService);
    expect(service).toBeTruthy();
  });
});
