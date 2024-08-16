import { TestBed } from '@angular/core/testing';

import { TokenUsageService } from './token-usage.service';

describe('TokenUsageService', () => {
  let service: TokenUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
