import { TestBed } from '@angular/core/testing';

import { CarsApiService } from './cars-api.service';

describe('CarsApiService', () => {
  let service: CarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
