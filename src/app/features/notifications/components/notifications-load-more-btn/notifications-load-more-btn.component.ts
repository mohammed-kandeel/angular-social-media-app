import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-load-more-btn',
  imports: [],
  templateUrl: './notifications-load-more-btn.component.html',
  styleUrl: './notifications-load-more-btn.component.css',
})
export class NotificationsLoadMoreBtnComponent {
  @Output() onLoadMore: EventEmitter<void> = new EventEmitter();

  loadMore() {
    this.onLoadMore.emit();
  }
}
