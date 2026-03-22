import {
  Component,
  inject,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../../../../core/services/comments/comments.service';
import { LocalStorageService } from '../../../../../core/services/local-storage/local-storage.service';
import { IReplayComment } from '../../../../interfaces/ireplay-comment.interface';
import { ViewImgPostComponent } from '../view-img-post/view-img-post.component';
import { DatePipe } from '@angular/common';
import { IUser } from '../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-post-reply-comment',
  imports: [ViewImgPostComponent, DatePipe, ReactiveFormsModule],
  templateUrl: './post-reply-comment.component.html',
  styleUrl: './post-reply-comment.component.css',
})
export class PostReplyCommentComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly commentsService = inject(CommentsService);

  @Input({ required: true }) comment!: IReplayComment;
  @Output() updateComments = new EventEmitter<void>();

  user: IUser = this.localStorageService.getUser();
  editInput: FormControl = new FormControl('', Validators.minLength(2));

  toggleDropMenu: boolean = true;
  isReplays: boolean = false;
  isViewImg: boolean = false;
  isEditComment: boolean = false;
  isEditLoading: boolean = false;
  isDeleteComment: boolean = false;
  isEditInputValid!: boolean;

  @ViewChild('dropDownMenuBtn') dropDownMenuBtn!: ElementRef;
  @HostListener('window:click', ['$event'])
  closeDropMenu(event: Event) {
    if (this.dropDownMenuBtn?.nativeElement.contains(event?.target)) return;
    this.toggleDropMenu = true;
  }
  openDropMenu(): void {
    this.toggleDropMenu = !this.toggleDropMenu;
  }

  // image
  onViewImg() {
    this.isViewImg = true;
  }
  onCloseViewImg() {
    this.isViewImg = false;
  }

  // edit
  onOpenEditComment(): void {
    this.isEditComment = true;
    this.editInput.setValue(this.comment.content);
    this.onValidEdit();
  }

  onValidEdit() {
    if (this.editInput.valid) this.isEditInputValid = true;
    else this.isEditInputValid = false;
  }
  onCancelComment() {
    this.isEditComment = false;
  }
  onEditComment() {
    this.onValidEdit();
    if (!this.isEditInputValid) return;
    if (this.isEditLoading) return;

    this.isEditLoading = true;
    const formData: FormData = new FormData();
    formData.append('content', this.editInput.value);

    this.commentsService.updateComment(formData, this.comment.post, this.comment._id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.comment = res.data.comment;

          this.isEditComment = false;
          this.isEditLoading = false;
        }
      },
      error: () => {
        this.isEditComment = false;
        this.isEditLoading = false;
      },
    });
  }

  // delete
  onDeleteComment() {
    this.isDeleteComment = true;
    this.commentsService.deleteComment(this.comment.post, this.comment._id).subscribe({
      next: (res) => {
        console.log(res);
        console.log('done');
        this.updateComments.emit();
      },
      error: () => {
        this.isDeleteComment = false;
      },
    });
  }

  // like
  isLike: boolean = false;
  toggleLike() {
    if (this.isLike) return;
    this.isLike = !this.isLike;
    this.commentsService.likeComment(this.comment.post, this.comment._id).subscribe({
      next: (res) => {
        console.log(res);
        this.comment.likes = res.data.comment.likes;
        this.isLike = false;
      },
      error: () => {
        this.isLike = false;
      },
    });
  }

  // // Replay
  // onReplays() {
  //   this.isReplays = !this.isReplays;
  // }
  // onUpdataNumberReply(event: number): void {
  //   this.comment.repliesCount = this.comment.repliesCount + event;
  // }
}
