import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsCardComponent } from '../notifications-card/notifications-card.component';
import { NotificationsSkeletonCardComponent } from '../notifications-skeleton-card/notifications-skeleton-card.component';
import { INotification } from '../../interfaces/inotifications-response.interface';

@Component({
  selector: 'app-notifications-cards-container',
  imports: [NotificationsCardComponent, NotificationsSkeletonCardComponent],
  templateUrl: './notifications-cards-container.component.html',
  styleUrl: './notifications-cards-container.component.css',
})
export class NotificationsCardsContainerComponent {
  @Input({ required: true }) notifications!: INotification[];
  @Input({ required: true }) isLoading!: boolean;
}
