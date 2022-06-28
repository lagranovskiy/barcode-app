import { TestBed } from '@angular/core/testing';

import { RecordStorageService } from './record-storage.service';

describe('RecordStorageService', () => {
  let service: RecordStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
