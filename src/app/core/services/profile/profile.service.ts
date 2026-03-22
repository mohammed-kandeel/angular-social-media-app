import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Observable } from 'rxjs';
import { App_Apis } from '../../constant/app-apis';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly headerService = inject(HeaderService);

  getHeader() {
    return this.headerService.getHeader();
  }
  // get
  getMyProfileData(): Observable<any> {
    return this.httpClient.get(App_Apis.users + '/profile-data', { headers: this.getHeader() });
  }
  getUserProfileData(userId: string): Observable<any> {
    return this.httpClient.get(App_Apis.users + `/${userId}/profile`, {
      headers: this.getHeader(),
    });
  }

  // upload Cover & photo
  uploadCover(cover: FormData): Observable<any> {
    return this.httpClient.put(App_Apis.users + '/upload-cover', cover, {
      headers: this.getHeader(),
    });
  }
  uploadPhoto(photo: FormData): Observable<any> {
    return this.httpClient.put(App_Apis.users + '/upload-photo', photo, {
      headers: this.getHeader(),
    });
  }

  // delete Cover & photo
  deleteCover(): Observable<any> {
    return this.httpClient.delete(App_Apis.users + '/cover', { headers: this.getHeader() });
  }
  deletePhoto(): Observable<any> {
    return this.httpClient.delete(App_Apis.users + '/upload-photo', { headers: this.getHeader() });
  }
}
