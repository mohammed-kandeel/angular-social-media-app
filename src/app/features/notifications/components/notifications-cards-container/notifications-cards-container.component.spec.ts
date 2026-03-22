import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsCardsContainerComponent } from './notifications-cards-container.component';

describe('NotificationsCardsContainerComponent', () => {
  let component: NotificationsCardsContainerComponent;
  let fixture: ComponentFixture<NotificationsCardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsCardsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
