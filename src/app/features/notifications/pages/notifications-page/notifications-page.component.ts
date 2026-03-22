import { Component, inject, OnInit } from '@angular/core';
import { NotificationsHeaderComponent } from '../../components/notifications-header/notifications-header.component';
import { NotificationsFilterBtnsComponent } from '../../components/notifications-filter-btns/notifications-filter-btns.component';
import { NotificationsCardsContainerComponent } from '../../components/notifications-cards-container/notifications-cards-container.component';
import { NotificationsLoadMoreBtnComponent } from '../../components/notifications-load-more-btn/notifications-load-more-btn.component';
import { CountNotificationService } from '../../../../core/services/countNotification/count-notification.service';
import { NotificationsService } from '../../../../core/services/notifications/notifications.service';
import {
  INotification,
  INotificationsResponse,
} from '../../interfaces/inotifications-response.interface';

@Component({
  selector: 'app-notifications-page',
  imports: [
    NotificationsHeaderComponent,
    NotificationsFilterBtnsComponent,
    NotificationsCardsContainerComponent,
    NotificationsLoadMoreBtnComponent,
  ],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.css',
})
export class NotificationsPageComponent implements OnInit {
  private readonly countNotificationService = inject(CountNotificationService);
  private readonly notificationsService = inject(NotificationsService);

  totalNotifications!: number;
  isAllNotification: boolean = true;
  page: number = 1;
  allNotifications: INotification[] = [];
  filteredNotifications!: INotification[];
  isLoading: boolean = false;
  isLoadMore: boolean = false;
  isMarkAllActive: boolean = false;

  ngOnInit(): void {
    this.getNotificationsCount();
    this.getNotifications();
    this.countNotificationService.countNotification.subscribe(() => {
      this.getNotificationsCount();
    });
  }

  // api call
  getNotificationsCount(): void {
    this.notificationsService.getNotificationsCount().subscribe({
      next: (res) => {
        if (res.data.unreadCount !== this.totalNotifications) {
          this.page = 1;
          this.getNotifications();
        }
        this.totalNotifications = res.data.unreadCount;
      },
      error: () => {
        this.totalNotifications = 0;
      },
    });
  }
  getNotifications(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.notificationsService.getNotifications(this.page).subscribe({
      next: (res: INotificationsResponse) => {
        if (this.page === 1) this.allNotifications = [];
        this.allNotifications = [...this.allNotifications, ...res.data.notifications];
        this.isLoadMore = this.totalNotifications > this.allNotifications.length;
        this.getFilterNotifications();
        this.isLoading = false;
      },
    });
  }

  // mark All
  onMarkAll(): void {
    if (!this.isMarkAllActive) return;
    this.notificationsService.setAllReadNotifications().subscribe();
    this.updateNotification();
  }

  //  filter
  onFilter(event: boolean): void {
    this.updateNotification();
    if (this.isAllNotification === event) return;
    this.isAllNotification = event;
    this.getFilterNotifications();
  }
  getFilterNotifications(): void {
    if (this.isAllNotification) {
      this.filteredNotifications = this.allNotifications;
    } else {
      this.filteredNotifications = this.allNotifications?.filter((value) => {
        return value.isRead === this.isAllNotification;
      });
    }
    this.isMarkAllActive = this.totalNotifications > 0 ? true : false;
  }

  // Load More
  onLoadMore(): void {
    this.updateNotification();
    this.page++;
    this.getNotifications();
  }
  updateNotification() {
    this.getNotificationsCount();
    this.countNotificationService.updateCountNotification();
  }
}
