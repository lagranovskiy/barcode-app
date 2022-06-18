import { TestBed } from '@angular/core/testing';

import { FragenEinleseService } from './fragen-generator.service';

describe('FragenGeneratorService', () => {
  let service: FragenEinleseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragenEinleseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
