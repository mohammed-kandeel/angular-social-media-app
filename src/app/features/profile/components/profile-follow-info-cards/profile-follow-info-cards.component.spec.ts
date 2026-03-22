import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFollowInfoCardsComponent } from './profile-follow-info-cards.component';

describe('ProfileFollowInfoCardsComponent', () => {
  let component: ProfileFollowInfoCardsComponent;
  let fixture: ComponentFixture<ProfileFollowInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFollowInfoCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFollowInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
