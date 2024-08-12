import { TestBed } from '@angular/core/testing';

import { GenAiHttpService } from './gen-ai-http.service';

describe('GenAiHttpService', () => {
  let service: GenAiHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenAiHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
