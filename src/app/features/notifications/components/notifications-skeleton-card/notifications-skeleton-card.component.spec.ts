import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsSkeletonCardComponent } from './notifications-skeleton-card.component';

describe('NotificationsSkeletonCardComponent', () => {
  let component: NotificationsSkeletonCardComponent;
  let fixture: ComponentFixture<NotificationsSkeletonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsSkeletonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsSkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
