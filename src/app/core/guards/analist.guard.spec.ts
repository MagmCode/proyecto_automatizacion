import { TestBed } from '@angular/core/testing';

import { AnalistGuard } from './analist.guard';

describe('AnalistGuard', () => {
  let guard: AnalistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnalistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
