import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonTopSectionComponent } from './skeleton-top-section.component';

describe('SkeletonTopSectionComponent', () => {
  let component: SkeletonTopSectionComponent;
  let fixture: ComponentFixture<SkeletonTopSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonTopSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonTopSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
