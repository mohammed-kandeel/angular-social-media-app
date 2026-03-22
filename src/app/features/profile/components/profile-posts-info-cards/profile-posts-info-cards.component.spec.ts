import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsInfoCardsComponent } from './profile-posts-info-cards.component';

describe('ProfilePostsInfoCardsComponent', () => {
  let component: ProfilePostsInfoCardsComponent;
  let fixture: ComponentFixture<ProfilePostsInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePostsInfoCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePostsInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
