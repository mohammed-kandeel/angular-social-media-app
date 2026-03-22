import { TestBed } from '@angular/core/testing';

import { CountNotificationService } from './count-notification.service';

describe('CountNotificationService', () => {
  let service: CountNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
