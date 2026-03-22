import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNameUserNameComponent } from './profile-name-user-name.component';

describe('ProfileNameUserNameComponent', () => {
  let component: ProfileNameUserNameComponent;
  let fixture: ComponentFixture<ProfileNameUserNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNameUserNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileNameUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
