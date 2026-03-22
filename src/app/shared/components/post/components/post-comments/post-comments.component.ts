import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { PostEmptyCommentsComponent } from '../post-empty-comments/post-empty-comments.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { PostLoadingCommentComponent } from '../post-loading-comment/post-loading-comment.component';
import { PostLoadMoreCommentsBtnComponent } from '../post-load-more-comments-btn/post-load-more-comments-btn.component';
import { IComment } from '../../../../interfaces/icomment.interface';
import { CommentsService } from '../../../../../core/services/comments/comments.service';
import { InputCreateCommentComponent } from '../input-create-comment/input-create-comment.component';
import { LocalStorageService } from '../../../../../core/services/local-storage/local-storage.service';
import { IUser } from '../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-post-comments',
  imports: [
    PostEmptyCommentsComponent,
    PostCommentComponent,
    PostLoadingCommentComponent,
    PostLoadMoreCommentsBtnComponent,
    InputCreateCommentComponent,
  ],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly localStorageService = inject(LocalStorageService);

  @Input({ required: true }) postId!: string;
  @Output() commentsNumber: EventEmitter<number> = new EventEmitter();

  user: IUser = this.localStorageService.getUser();

  listComments: IComment[] = [];
  pageNumber: number = 1;

  isLoading: boolean = false;
  isEmpty: boolean = false;
  isLoadMoreValid: boolean = false;
  isUpdateComments: boolean = false;
  isLoadingInput!: boolean;

  //
  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    if (this.isLoading || this.isEmpty) return;

    this.isLoading = true;
    this.isLoadMoreValid = false;

    this.commentsService.getComments(this.postId, this.pageNumber, 5).subscribe({
      next: (res: any) => {
        console.log('comments', res.data.comments);

        if (this.isUpdateComments) this.listComments = [];
        this.listComments = [...this.listComments, ...res.data.comments];

        this.isUpdateComments = false;
        this.isLoading = false;
        this.isLoadMoreValid = res.meta.pagination.total > this.listComments.length;
        this.commentsNumber.emit(res.meta.pagination.total);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.isEmpty = true;
      },
    });
  }

  loadingMoreComments() {
    if (this.isLoading) return;
    this.pageNumber++;
    this.getComments();
  }

  updateComments() {
    this.isUpdateComments = true;
    this.pageNumber = 1;
    this.getComments();
  }

  // create comment
  postComment(event: { text?: string; file?: File }) {
    this.isLoadingInput = true;
    const formDta = new FormData();

    if (event.text) formDta.append('content', event.text);
    if (event.file) formDta.append('image', event.file as File);

    this.commentsService.createComments(formDta, this.postId).subscribe({
      next: (res) => {
        console.log(res);
        res.repliesCount = 0;
        this.listComments.unshift(res.data.comment);
        this.isLoadingInput = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingInput = false;
      },
    });
  }
}
