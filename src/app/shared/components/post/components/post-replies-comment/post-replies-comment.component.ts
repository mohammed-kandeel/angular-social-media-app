import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentsService } from '../../../../../core/services/comments/comments.service';
import { LocalStorageService } from '../../../../../core/services/local-storage/local-storage.service';
import { IReplayComment } from '../../../../interfaces/ireplay-comment.interface';
import { PostReplyCommentComponent } from '../post-reply-comment/post-reply-comment.component';
import { InputCreateCommentComponent } from '../input-create-comment/input-create-comment.component';
import { IUser } from '../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-post-replies-comment',
  imports: [PostReplyCommentComponent, InputCreateCommentComponent],
  templateUrl: './post-replies-comment.component.html',
  styleUrl: './post-replies-comment.component.css',
})
export class PostRepliesCommentComponent {
  private readonly commentsService = inject(CommentsService);
  private readonly localStorageService = inject(LocalStorageService);

  @Input({ required: true }) commentId!: string;
  @Input({ required: true }) postId!: string;
  @Input({ required: true }) replayCommentName!: string;
  @Output() updataNumberReply: EventEmitter<number> = new EventEmitter();
  @Output() closeRepliesComments: EventEmitter<void> = new EventEmitter();

  user: IUser = this.localStorageService.getUser();

  listReComments: IReplayComment[] = [];
  pageNumber: number = 1;
  isLoading: boolean = false;
  isEmpty: boolean = false;
  isLoadMoreValid: boolean = false;
  isUpdateComments: boolean = false;
  isLoadingInput!: boolean;

  // -------------------------
  //
  ngOnInit(): void {
    this.getReComments();
  }

  getReComments(): void {
    if (this.isLoading || this.isEmpty) return;

    this.isLoading = true;
    this.isLoadMoreValid = false;

    this.commentsService
      .getRepliesComments(this.postId, this.commentId, this.pageNumber, 5)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (this.isUpdateComments) this.listReComments = [];
          this.listReComments = [...this.listReComments, ...res.data.replies];

          this.isUpdateComments = false;
          this.isLoading = false;
          this.isLoadMoreValid = res.meta.pagination.total > this.listReComments.length;
          this.updataNumberReply.emit(res.meta.pagination.total);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.isEmpty = true;
        },
      });
  }
  getMoreComments() {
    if (!this.isLoadMoreValid) return;
    this.pageNumber++;
    this.getReComments();
  }

  loadingMoreComments() {
    if (this.isLoading) return;
    this.pageNumber++;
    this.getReComments();
  }

  updateComments() {
    this.isUpdateComments = true;
    this.pageNumber = 1;
    this.getReComments();
  }

  // create comment
  postComment(event: { text?: string; file?: File }) {
    this.isLoadingInput = true;
    const formDta = new FormData();

    if (event.text) formDta.append('content', event.text);
    if (event.file) formDta.append('image', event.file as File);

    this.commentsService.createRepliesComments(formDta, this.postId, this.commentId).subscribe({
      next: (res) => {
        this.updateComments();
        this.isLoadingInput = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingInput = false;
      },
    });
  }

  onCloseRepliesComments() {
    this.closeRepliesComments.emit();
  }
}
