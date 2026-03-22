import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountNotificationService {
  countNotification = new Subject<void>();

  updateCountNotification() {
    this.countNotification.next();
  }
}
