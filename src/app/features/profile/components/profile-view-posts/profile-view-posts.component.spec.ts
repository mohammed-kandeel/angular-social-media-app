import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewPostsComponent } from './profile-view-posts.component';

describe('ProfileViewPostsComponent', () => {
  let component: ProfileViewPostsComponent;
  let fixture: ComponentFixture<ProfileViewPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileViewPostsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileViewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
