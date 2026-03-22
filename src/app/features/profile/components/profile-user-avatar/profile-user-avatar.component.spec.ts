import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserAvatarComponent } from './profile-user-avatar.component';

describe('ProfileUserAvatarComponent', () => {
  let component: ProfileUserAvatarComponent;
  let fixture: ComponentFixture<ProfileUserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUserAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
