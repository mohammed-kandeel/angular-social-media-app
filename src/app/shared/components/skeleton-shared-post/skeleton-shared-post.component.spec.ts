import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSharedPostComponent } from './skeleton-shared-post.component';

describe('SkeletonSharedPostComponent', () => {
  let component: SkeletonSharedPostComponent;
  let fixture: ComponentFixture<SkeletonSharedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonSharedPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonSharedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
