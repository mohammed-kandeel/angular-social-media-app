import { inject, Injectable } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { App_Apis } from '../../constant/app-apis';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);
  private readonly headerService = inject(HeaderService);

  getHeader() {
    return this.headerService.getHeader();
  }

  // get comments
  getComments(postId: string, page: number = 1, limit: number = 5) {
    return this.httpClient.get<any>(App_Apis.posts + `/${postId}/comments`, {
      headers: this.getHeader(),
      params: this.getPrams(page, limit),
    });
  }
  getRepliesComments(postId: string, commentId: string, page: number = 1, limit: number = 5) {
    return this.httpClient.get<any>(App_Apis.posts + `/${postId}/comments/${commentId}/replies`, {
      headers: this.getHeader(),
      params: this.getPrams(page, limit),
    });
  }

  // create comments
  createComments(formData: FormData, postId: string) {
    return this.httpClient.post<any>(App_Apis.posts + `/${postId}/comments`, formData, {
      headers: this.getHeader(),
    });
  }
  createRepliesComments(formData: FormData, postId: string, commentId: string) {
    return this.httpClient.post<any>(
      App_Apis.posts + `/${postId}/comments/${commentId}/replies`,
      formData,
      {
        headers: this.getHeader(),
      },
    );
  }

  // update comment
  /***
   * formData{content,image}
   */
  updateComment(formData: FormData, postId: string, commentId: string) {
    return this.httpClient.put<any>(App_Apis.posts + `/${postId}/comments/${commentId}`, formData, {
      headers: this.getHeader(),
    });
  }

  // like - unlike
  likeComment(postId: string, commentId: string) {
    return this.httpClient.put<any>(
      App_Apis.posts + `/${postId}/comments/${commentId}/like`,
      {},
      {
        headers: this.getHeader(),
      },
    );
  }

  //delete
  deleteComment(postId: string, commentId: string) {
    return this.httpClient.delete<any>(App_Apis.posts + `/${postId}/comments/${commentId}`, {
      headers: this.getHeader(),
    });
  }

  getPrams(page: number = 1, limit: number = 5) {
    return new HttpParams({ fromObject: { page: page, limit: limit } });
  }
}
