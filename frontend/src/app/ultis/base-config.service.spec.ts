import { TestBed } from '@angular/core/testing';

import { BaseConfigService } from './base-config.service';

describe('BaseConfigService', () => {
  let service: BaseConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
