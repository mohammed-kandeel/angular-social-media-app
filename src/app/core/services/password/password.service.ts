import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Observable } from 'rxjs';
import { App_Apis } from '../../constant/app-apis';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private readonly httpClient = inject(HttpClient);
  private readonly headerService = inject(HeaderService);

  getHeader() {
    return this.headerService.getHeader();
  }
  // updata password
  updataPassword(data: { password: string; newPassword: string }): Observable<any> {
    return this.httpClient.patch(App_Apis.users + '/change-password', data, {
      headers: this.getHeader(),
    });
  }
}
