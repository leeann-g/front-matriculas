import { TestBed } from '@angular/core/testing';

import { ApiRoturas } from './api-roturas';

describe('ApiRoturas', () => {
  let service: ApiRoturas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRoturas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
