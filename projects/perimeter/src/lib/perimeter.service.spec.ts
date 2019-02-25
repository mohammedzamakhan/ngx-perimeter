import { TestBed } from '@angular/core/testing';

import { PerimeterService } from './perimeter.service';

describe('PerimeterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerimeterService = TestBed.get(PerimeterService);
    expect(service).toBeTruthy();
  });
});
