import { TestBed } from '@angular/core/testing';

import { PerimeterBreachService } from './perimeter-strategy.service';

describe('PerimeterStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerimeterBreachService = TestBed.get(PerimeterBreachService);
    expect(service).toBeTruthy();
  });
});
