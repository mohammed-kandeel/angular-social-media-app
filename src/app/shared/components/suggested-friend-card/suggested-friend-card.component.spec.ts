import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedFriendCardComponent } from './suggested-friend-card.component';

describe('SuggestedFriendCardComponent', () => {
  let component: SuggestedFriendCardComponent;
  let fixture: ComponentFixture<SuggestedFriendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedFriendCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestedFriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
