import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LocalStorageService } from '../../../../../core/services/local-storage/local-storage.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../../../core/services/posts/posts.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdataPostsService } from '../../../../../features/feed/services/updata-posts.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { IPost } from '../../../../../core/interfaces/i-post.interface';
import { IUser } from '../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-post-title',
  imports: [FormsModule, RouterLink, DatePipe, ReactiveFormsModule, DeleteModalComponent],
  templateUrl: './post-title.component.html',
  styleUrl: './post-title.component.css',
})
export class PostTitleComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly postsService = inject(PostsService);
  private readonly updataPostsService = inject(UpdataPostsService);

  @Input({ required: true }) post!: IPost;
  @Input({ required: true }) isEditPost!: boolean;
  @Output() editPost: EventEmitter<boolean> = new EventEmitter();
  @Output() deletePost: EventEmitter<void> = new EventEmitter();

  user: IUser = this.localStorageService.getUser();
  isBookMark: boolean = false;
  isLoadingBookMark: boolean = false;
  toggleDropdown: boolean = true;
  privacyInput: FormControl = new FormControl('');
  isLoadingPrivacy: boolean = false;

  ngOnInit(): void {
    this.privacyInput.setValue(this.post.privacy);
    this.isBookMark = this.post.bookmarked;
  }

  @ViewChild('dropdownHoverBtn') dropdownHoverBtn!: ElementRef;
  @HostListener('window:scroll')
  @HostListener('window:click', ['$event'])
  closeDropdown(event?: any) {
    if (!event) {
      this.toggleDropdown = true;
      return;
    }
    const clickedElement = event.target as HTMLElement;
    if (!this.dropdownHoverBtn.nativeElement.contains(clickedElement)) {
      this.toggleDropdown = true;
    }
  }
  onToggleDropdownButton(): void {
    this.toggleDropdown = !this.toggleDropdown;
  }
  onToggleBookMark() {
    if (this.isLoadingBookMark) return;

    this.isLoadingBookMark = true;
    this.postsService.toggleBookmarkPost(this.post._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.isBookMark = res.data.bookmarked;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoadingBookMark = false;
      },
      complete: () => {
        this.isLoadingBookMark = false;
      },
    });
  }
  onChangPrivacy() {
    if (this.isLoadingPrivacy) return;
    this.isLoadingPrivacy = true;
    this.privacyInput.disable();

    this.postsService.updatePost({ privacy: this.privacyInput.value }, this.post._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.privacyInput.setValue(res.data.post.privacy);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoadingPrivacy = false;
        this.privacyInput.enable();
      },
      complete: () => {
        this.isLoadingPrivacy = false;
        this.privacyInput.enable();
      },
    });
  }

  onEditPost() {
    this.editPost.emit(true);
  }

  // delete post
  isOpenDeletePoste: boolean = false;
  onDeletePostBtn() {
    this.isOpenDeletePoste = true;
  }
  onConfirmDeletePost() {
    this.deletePost.emit();
    this.postsService.deletePost(this.post._id).subscribe({
      next: (res) => {
        this.isOpenDeletePoste = false;
        this.updataPostsService.triggerRefresh();
      },
      error: (err) => {
        console.log(err);
        this.isOpenDeletePoste = false;
      },
    });
  }
  onCancelDelete() {
    this.isOpenDeletePoste = false;
  }
}
