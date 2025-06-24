import { TestBed } from '@angular/core/testing';

import { CartaAvalService } from './carta-aval.service';

describe('CartaAvalService', () => {
  let service: CartaAvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartaAvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
