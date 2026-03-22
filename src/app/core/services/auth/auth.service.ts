import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { App_Apis } from '../../constant/app-apis';
import { Stored_Keys } from '../../constant/stored-keys';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  login(data: object): Observable<any> {
    return this.httpClient.post(App_Apis.auth.signin, data);
  }
  signUp(data: object): Observable<any> {
    return this.httpClient.post(App_Apis.auth.signUp, data);
  }
  logout() {
    this.localStorageService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
