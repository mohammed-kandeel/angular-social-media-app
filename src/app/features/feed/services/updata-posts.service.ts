import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdataPostsService {
  refreshPosts = new Subject<void>();

  triggerRefresh() {
    this.refreshPosts.next();
  }
}
