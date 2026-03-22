import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-header',
  imports: [],
  templateUrl: './notifications-header.component.html',
  styleUrl: './notifications-header.component.css',
})
export class NotificationsHeaderComponent {
  @Output() onMarkAll: EventEmitter<void> = new EventEmitter();

  @Input() isMarkAllActive!: boolean;

  markAll() {
    this.onMarkAll.emit();
  }
}
