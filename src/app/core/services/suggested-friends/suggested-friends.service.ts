import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { App_Apis } from '../../constant/app-apis';
import { HeaderService } from '../header/header.service';

@Injectable({
  providedIn: 'root',
})
export class SuggestedFriendsService {
  private readonly httpClient = inject(HttpClient);
  private readonly headerService = inject(HeaderService);

  getHeader() {
    return this.headerService.getHeader();
  }

  // Friends suggestions
  getSuggestionsFriends(limit: number = 5, page: number = 1): Observable<any> {
    return this.httpClient.get(App_Apis.users + `/suggestions` + `?&page=${page}&limit=${limit}`, {
      headers: this.getHeader(),
    });
  }

  // search Friends
  getSearchFriends(search: string, page: number = 1, limit: number = 15): Observable<any> {
    return this.httpClient.get(
      App_Apis.users + `/search` + `?&page=${page}&limit=${limit}` + `&q=${search}`,
      {
        headers: this.getHeader(),
      },
    );
  }

  // {{userId}}/follow
  toggleFollow(userId: string): Observable<any> {
    return this.httpClient.put(
      App_Apis.users + `/${userId}/follow`,
      {},
      {
        headers: this.getHeader(),
      },
    );
  }
}
