import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../../../../core/services/posts/posts.service';
import {
  IPostReactedUsersResponse,
  IReactedUser,
} from '../../../../interfaces/i-post-reacted-users-response.interface';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-post-people-who-reacted-modal',
  imports: [RouterLink, InfiniteScrollDirective],
  templateUrl: './post-people-who-reacted-modal.component.html',
  styleUrl: './post-people-who-reacted-modal.component.css',
})
export class PostPeopleWhoReactedModalComponent {
  @Input({ required: true }) postId!: string;
  @Output() onCloseModel = new EventEmitter<void>();

  private readonly postsService = inject(PostsService);

  reactedUsers: IReactedUser[] = [];

  isLoading: boolean = false;
  isLoadingMore: boolean = false;

  page: number = 1;

  getLikes() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.postsService.getPostLikes(this.postId, this.page, 50).subscribe({
      next: (res: IPostReactedUsersResponse) => {
        if (!res.data.likes.length) this.page--;

        const newReactedUser = res.data.likes?.filter(
          (reactedUser: IReactedUser) => !this.reactedUsers.some((r) => r._id === reactedUser._id),
        );
        this.reactedUsers.push(...newReactedUser);
        this.isLoading = false;
        this.isLoadingMore = false;
      },
      error: (err) => {
        console.log(err);
        this.closeModal();
        this.isLoading = false;
        this.isLoadingMore = false;
      },
    });
  }

  onScroll() {
    if (this.isLoadingMore) return;
    this.isLoadingMore = true;
    this.page++;
    this.getLikes();
  }

  ngAfterContentInit(): void {
    document.body.classList.add('overflow-hidden');
    this.getLikes();
  }
  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Escape') this.closeModal();
  }

  @ViewChild('modal') modal!: ElementRef;
  onCloseModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target !== this.modal.nativeElement) {
      this.closeModal();
    }
  }
  onBgModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target !== this.modal.nativeElement && !this.modal.nativeElement.contains(target)) {
      this.closeModal();
    }
  }
  closeModal() {
    this.onCloseModel.emit();
  }
}
