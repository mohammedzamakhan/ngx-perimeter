import { TestBed } from '@angular/core/testing';

import { PerimeterStrategyService } from './perimeter-strategy.service';

describe('PerimeterStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerimeterStrategyService = TestBed.get(PerimeterStrategyService);
    expect(service).toBeTruthy();
  });
});
