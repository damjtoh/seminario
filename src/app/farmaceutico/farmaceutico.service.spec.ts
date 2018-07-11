import { TestBed, inject } from '@angular/core/testing';

import { FarmaceuticoService } from './farmaceutico.service';

describe('FarmaceuticoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmaceuticoService]
    });
  });

  it('should be created', inject([FarmaceuticoService], (service: FarmaceuticoService) => {
    expect(service).toBeTruthy();
  }));
});
