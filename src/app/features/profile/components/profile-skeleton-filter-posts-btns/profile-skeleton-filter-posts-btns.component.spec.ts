import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkeletonFilterPostsBtnsComponent } from './profile-skeleton-filter-posts-btns.component';

describe('ProfileSkeletonFilterPostsBtnsComponent', () => {
  let component: ProfileSkeletonFilterPostsBtnsComponent;
  let fixture: ComponentFixture<ProfileSkeletonFilterPostsBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSkeletonFilterPostsBtnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSkeletonFilterPostsBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
