import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { PostsService } from '../../../../../core/services/posts/posts.service';
import { SharePostModalComponent } from '../../../share-post-modal/share-post-modal.component';
import { UpdataPostsService } from '../../../../../features/feed/services/updata-posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { IPost } from '../../../../../core/interfaces/i-post.interface';
import { PostPeopleWhoReactedModalComponent } from '../post-people-who-reacted-modal/post-people-who-reacted-modal.component';
import { LocalStorageService } from '../../../../../core/services/local-storage/local-storage.service';
import { IUser } from '../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-post-footer',
  imports: [SharePostModalComponent, RouterLink, PostPeopleWhoReactedModalComponent],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css',
})
export class PostFooterComponent implements OnChanges {
  private readonly postsService = inject(PostsService);
  private readonly updataPostsService = inject(UpdataPostsService);
  private readonly localStorageService = inject(LocalStorageService);

  @Input({ required: true }) post!: IPost;
  @Input({ required: true }) commentsNumber!: number;

  @Output() isOpenComments: EventEmitter<boolean> = new EventEmitter();

  user: IUser = this.localStorageService.getUser();
  isLike!: boolean;
  likesCount: number = 0;
  toggleModal: boolean = false;
  toggleComments: boolean = false;
  isShowReactedModal: boolean = false;

  ngAfterContentInit(): void {
    this.isPostLike();
  }
  ngOnChanges(): void {
    this.post.commentsCount = this.commentsNumber;
  }

  isPostLike() {
    for (let i = 0; i < this.post.likesCount; i++) {
      if (this.post.likes[i] === this.user._id) {
        this.isLike = true;
        break;
      }
    }
  }
  onToggleLike(): void {
    this.isLike = !this.isLike;
    if (this.isLike) this.post.likesCount++;
    else this.post.likesCount--;

    this.postsService.toggleLikePost(this.post._id).subscribe({
      next: (res) => {
        this.isLike = res.data.liked;
        this.post.likesCount = res.data.likesCount;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  onSharePoste() {
    this.toggleModal = true;
  }

  modalEvent(e: { update: boolean }): void {
    if (e.update) {
      this.updataPostsService.triggerRefresh();
    }
    this.toggleModal = false;
  }

  onToggleComments() {
    this.toggleComments = !this.toggleComments;
    this.isOpenComments.emit(this.toggleComments);
  }

  onShowReactedModal() {
    if (this.post.likesCount > 0) this.isShowReactedModal = true;
  }
  onCloseReactedModal() {
    this.isShowReactedModal = false;
  }
}
