import { TestBed } from '@angular/core/testing';

import { AseguradoraService } from './aseguradora.service';

describe('AseguradoraService', () => {
  let service: AseguradoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AseguradoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
