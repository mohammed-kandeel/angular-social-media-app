import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsLoadMoreBtnComponent } from './notifications-load-more-btn.component';

describe('NotificationsLoadMoreBtnComponent', () => {
  let component: NotificationsLoadMoreBtnComponent;
  let fixture: ComponentFixture<NotificationsLoadMoreBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsLoadMoreBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsLoadMoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
