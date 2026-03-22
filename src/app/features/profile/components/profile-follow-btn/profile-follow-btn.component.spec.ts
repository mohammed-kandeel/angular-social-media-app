import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFollowBtnComponent } from './profile-follow-btn.component';

describe('ProfileFollowBtnComponent', () => {
  let component: ProfileFollowBtnComponent;
  let fixture: ComponentFixture<ProfileFollowBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFollowBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFollowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
