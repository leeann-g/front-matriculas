import { TestBed } from '@angular/core/testing';

import { ApiInicio } from './api-inicio';

describe('ApiInicio', () => {
  let service: ApiInicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
