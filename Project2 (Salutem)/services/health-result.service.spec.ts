import { TestBed } from '@angular/core/testing';

import { HealthResultService } from './health-result.service';

describe('HealthResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthResultService = TestBed.get(HealthResultService);
    expect(service).toBeTruthy();
  });
});
