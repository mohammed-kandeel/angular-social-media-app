import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-filter-btns',
  imports: [],
  templateUrl: './notifications-filter-btns.component.html',
  styleUrl: './notifications-filter-btns.component.css',
})
export class NotificationsFilterBtnsComponent {
  @Input({ required: true }) isAllFilter!: boolean;
  @Input({ required: true }) totalNotifications!: number;

  @Output() onSelectedBtn: EventEmitter<boolean> = new EventEmitter();

  onclickBtn(value: boolean): void {
    this.onSelectedBtn.emit(value);
  }
}
