import { TestBed } from '@angular/core/testing';

import { UpdataPostsService } from './updata-posts.service';

describe('UpdataPostsService', () => {
  let service: UpdataPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdataPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
