import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly localStorageService = inject(LocalStorageService);

  getHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.localStorageService.getToken()}`,
    });
  }
}
