import { TestBed } from '@angular/core/testing';

import { ApiMatriculas } from './api-matriculas';

describe('ApiMatriculas', () => {
  let service: ApiMatriculas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMatriculas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
