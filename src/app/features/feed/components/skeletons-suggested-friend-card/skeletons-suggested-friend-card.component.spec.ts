import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonsSuggestedFriendCardComponent } from './skeletons-suggested-friend-card.component';

describe('SkeletonsSuggestedFriendCardComponent', () => {
  let component: SkeletonsSuggestedFriendCardComponent;
  let fixture: ComponentFixture<SkeletonsSuggestedFriendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonsSuggestedFriendCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonsSuggestedFriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
