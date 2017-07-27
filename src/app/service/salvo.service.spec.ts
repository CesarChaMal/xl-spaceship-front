import { TestBed, inject } from '@angular/core/testing';

import { SalvoService } from './salvo.service';

describe('SalvoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalvoService]
    });
  });

  it('should be created', inject([SalvoService], (service: SalvoService) => {
    expect(service).toBeTruthy();
  }));
});
