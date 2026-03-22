import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SkeletonsPostComponent } from '../../../../shared/components/skeletons-post/skeletons-post.component';
import { PostComponent } from '../../../../shared/components/post/post.component';
import { NoPostsComponent } from '../../../../shared/components/no-posts/no-posts.component';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadMorePostsSpinnerComponent } from '../load-more-posts-spinner/load-more-posts-spinner.component';
import { UpdataPostsService } from '../../services/updata-posts.service';
import { IPost } from '../../../../core/interfaces/i-post.interface';
import { InfiniteScrollComponent } from '../../../../shared/components/infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-saved-posts',
  imports: [
    SkeletonsPostComponent,
    PostComponent,
    NoPostsComponent,
    LoadMorePostsSpinnerComponent,
    InfiniteScrollComponent,
  ],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(PostsService);
  private updataPostsService = inject(UpdataPostsService);
  refreshPosts: Subscription = new Subscription();

  postsList: IPost[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  isLoadMorePage: boolean = true;

  ngOnInit(): void {
    this.getAllPosts();
    this.refreshPosts = this.updataPostsService.refreshPosts.subscribe(() => {
      this.updatePosts();
    });
  }
  ngOnDestroy(): void {
    this.refreshPosts.unsubscribe();
  }

  getAllPosts() {
    if (this.isLoading || !this.isLoadMorePage) return;
    this.isLoading = true;

    this.postsService.getBookmarksPosts().subscribe({
      next: (res) => {
        if (!res.data.bookmarks.length || res.data.bookmarks.length < 19)
          this.isLoadMorePage = false;

        const newPosts = res.data.bookmarks?.filter(
          (post: IPost) => !this.postsList.some((p) => p._id === post._id),
        );
        if (newPosts) this.postsList.push(...newPosts);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoading = false;
        this.isLoadMorePage = false;
      },
    });
  }

  updatePosts() {
    this.pageNumber = 1;
    this.isLoadMorePage = true;

    this.postsService.getBookmarksPosts().subscribe({
      next: (res) => {
        this.postsList = res.data.bookmarks;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoading = false;
        this.isLoadMorePage = false;
      },
    });
  }

  onScroll() {
    if (this.isLoading || !this.isLoadMorePage) return;
    this.pageNumber++;
    this.getAllPosts();
  }
}
