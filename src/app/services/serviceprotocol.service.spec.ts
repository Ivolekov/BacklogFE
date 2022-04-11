import { TestBed } from '@angular/core/testing';

import { ServiceprotocolService } from './serviceprotocol.service';

describe('ServiceprotocolService', () => {
  let service: ServiceprotocolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceprotocolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
