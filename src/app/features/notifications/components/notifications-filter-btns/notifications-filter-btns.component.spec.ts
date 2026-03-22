import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsFilterBtnsComponent } from './notifications-filter-btns.component';

describe('NotificationsFilterBtnsComponent', () => {
  let component: NotificationsFilterBtnsComponent;
  let fixture: ComponentFixture<NotificationsFilterBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsFilterBtnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsFilterBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
