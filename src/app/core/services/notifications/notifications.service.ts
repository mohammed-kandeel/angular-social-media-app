import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Observable } from 'rxjs';
import { App_Apis } from '../../constant/app-apis';
import { INotificationsResponse } from '../../../features/notifications/interfaces/inotifications-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient = inject(HttpClient);
  private readonly headerService = inject(HeaderService);

  getHeader() {
    return this.headerService.getHeader();
  }

  // count
  getNotificationsCount(): Observable<any> {
    return this.httpClient.get(App_Apis.notifications + '/unread-count', {
      headers: this.getHeader(),
    });
  }

  // notifications
  getNotifications(page: number = 1, limit: number = 20): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit,
      },
    });

    return this.httpClient.get<INotificationsResponse>(App_Apis.notifications, {
      headers: this.getHeader(),
      params: params,
    });
  }

  // read
  setReadNotification(notificationId: string): Observable<any> {
    return this.httpClient.patch(
      App_Apis.notifications + `/${notificationId}/read`,
      {},
      {
        headers: this.getHeader(),
      },
    );
  }

  // read-all

  setAllReadNotifications(): Observable<any> {
    return this.httpClient.patch(
      App_Apis.notifications + `/read-all`,
      {},
      {
        headers: this.getHeader(),
      },
    );
  }
}
