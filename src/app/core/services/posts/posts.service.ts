import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { App_Apis } from '../../constant/app-apis';
import { HeaderService } from '../header/header.service';
import { IPost } from '../../interfaces/i-post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  private readonly headerService = inject(HeaderService);

  getHeader() {
    return this.headerService.getHeader();
  }

  // get posts
  getAllPosts(page: number = 1, limit: number = 20): Observable<any> {
    return this.httpClient.get(App_Apis.posts + `?&page=${page}&limit=${limit}`, {
      headers: this.getHeader(),
    });
  }
  getFeedPosts(page: number = 1, limit: number = 20): Observable<any> {
    return this.httpClient.get(
      App_Apis.posts + '/feed?only=following' + `&limit=${limit}&page=${page}`,
      {
        headers: this.getHeader(),
      },
    );
  }
  getMyPosts(page: number = 1, limit: number = 20): Observable<any> {
    return this.httpClient.get(App_Apis.posts + '/feed?only=me' + `&limit=${limit}&page=${page}`, {
      headers: this.getHeader(),
    });
  }
  getBookmarksPosts(page: number = 1, limit: number = 20): Observable<any> {
    return this.httpClient.get(App_Apis.bookmarksPosts + `?limit=${limit}&page=${page}`, {
      headers: this.getHeader(),
    });
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(App_Apis.posts + `/${postId}`, {
      headers: this.getHeader(),
    });
  }
  getUserPosts(userId: string, page: number = 1, limit: number = 20): Observable<any> {
    return this.httpClient.get(
      App_Apis.users + `/${userId}/posts` + `?limit=${limit}&page=${page}`,
      {
        headers: this.getHeader(),
      },
    );
  }

  // new post
  createPost(data: FormData): Observable<any> {
    return this.httpClient.post(App_Apis.posts, data, {
      headers: this.getHeader(),
    });
  }

  // delete posts
  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(App_Apis.posts + `/${postId}`, {
      headers: this.getHeader(),
    });
  }

  // update Post
  updatePost(body: Partial<IPost>, postId: string): Observable<any> {
    return this.httpClient.put(App_Apis.posts + `/${postId}`, body, {
      headers: this.getHeader(),
    });
  }

  // share
  sharePost(postId: string, data: { body: string }): Observable<any> {
    if (data.body)
      return this.httpClient.post(App_Apis.posts + `/${postId}/share`, data, {
        headers: this.getHeader(),
      });
    else
      return this.httpClient.post(
        App_Apis.posts + `/${postId}/share`,
        {},
        {
          headers: this.getHeader(),
        },
      );
  }

  // likes
  toggleLikePost(postId: string): Observable<any> {
    return this.httpClient.put(
      App_Apis.posts + `/${postId}/like`,
      {},
      {
        headers: this.getHeader(),
      },
    );
  }
  getPostLikes(postId: string, page: number = 1, limit: number = 15): Observable<any> {
    return this.httpClient.get(
      App_Apis.posts + `/${postId}/likes` + `?&page=${page}&limit=${limit}`,
      {
        headers: this.getHeader(),
      },
    );
  }

  // bookmark
  toggleBookmarkPost(postId: string): Observable<any> {
    return this.httpClient.put(
      App_Apis.posts + `/${postId}/bookmark`,
      {},
      {
        headers: this.getHeader(),
      },
    );
  }
}
