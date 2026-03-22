import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { INotification } from '../../interfaces/inotifications-response.interface';
import { CountNotificationService } from '../../../../core/services/countNotification/count-notification.service';
import { NotificationsService } from '../../../../core/services/notifications/notifications.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications-card',
  imports: [DatePipe],
  templateUrl: './notifications-card.component.html',
  styleUrl: './notifications-card.component.css',
})
export class NotificationsCardComponent {
  private readonly router = inject(Router);
  private readonly countNotificationService = inject(CountNotificationService);
  private readonly notificationsService = inject(NotificationsService);

  @Input({ required: true }) notification!: INotification;

  @ViewChild('markAsReadBtn') markAsReadBtn: ElementRef<HTMLButtonElement> | undefined;

  isLoading: boolean = false;

  onMarkAsRead() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.notificationsService.setReadNotification(this.notification._id).subscribe({
      next: () => {
        this.countNotificationService.updateCountNotification();
        this.isLoading = false;
        this.notification.isRead = true;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onNavigate(event: Event): void {
    if (this.markAsReadBtn?.nativeElement?.contains(event.target as HTMLElement)) return;
    this.router.navigateByUrl(
      `${this.notification.type === 'follow_user' ? '/profile/' : '/posts/'}` +
        this.notification.entity._id,
    );
  }
}
