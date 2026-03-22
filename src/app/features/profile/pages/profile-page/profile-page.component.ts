import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TopSectionComponent } from './components/top-section/top-section.component';
import { ProfileFilterPostsBtnsComponent } from '../../components/profile-filter-posts-btns/profile-filter-posts-btns.component';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { ProfileViewPostsComponent } from '../../components/profile-view-posts/profile-view-posts.component';
import { SkeletonSharedPostComponent } from '../../../../shared/components/skeleton-shared-post/skeleton-shared-post.component';
import { ProfileSkeletonFilterPostsBtnsComponent } from '../../components/profile-skeleton-filter-posts-btns/profile-skeleton-filter-posts-btns.component';
import { SkeletonTopSectionComponent } from './components/skeleton-top-section/skeleton-top-section.component';
import { IPost } from '../../../../core/interfaces/i-post.interface';
import { IMyProfile, IProfileRes } from '../../../../core/interfaces/iprofile-res.interface';
import { UpdateProfileService } from '../../services/update-profile.service';
import { Subscription } from 'rxjs';
import { InfiniteScrollComponent } from '../../../../shared/components/infinite-scroll/infinite-scroll.component';
@Component({
  selector: 'app-profile-page',
  imports: [
    TopSectionComponent,
    ProfileFilterPostsBtnsComponent,
    ProfileViewPostsComponent,
    SkeletonSharedPostComponent,
    ProfileSkeletonFilterPostsBtnsComponent,
    SkeletonTopSectionComponent,
    InfiniteScrollComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly postsService = inject(PostsService);
  private readonly updateProfileService = inject(UpdateProfileService);

  userData!: IMyProfile;
  bookmarksPosts: IPost[] = [];
  bookmarksPostsPage: number = 1;
  bookmarksPostsNumber: number = 0;

  myPosts: IPost[] = [];
  myPostsPage: number = 1;
  myPostsNumber: number = 0;

  isLoadingUserData: boolean = false;
  isLoadingPosts: boolean = false;
  isLoadingMorePosts: boolean = false;
  isLoadingBookmarks: boolean = false;
  isLoadingMoreBookmarks: boolean = false;
  isLoadingOnScroll: boolean = false;

  filterValue: 'posts' | 'bookmark' = 'posts';
  falterPosts!: IPost[];
  falterPostsNumber: number = 0;

  updateProfile: Subscription = new Subscription();

  ngOnInit(): void {
    this.getMyProfileData();
    this.getBookMarkedPosts();
    this.getMyPosts();

    this.updateProfile = this.updateProfileService.refreshProfile.subscribe(() => {
      this.getMyProfileData();
      this.getBookMarkedPosts();
      this.getMyPosts();

      this.isLoadingUserData = false;
      this.isLoadingPosts = false;
      this.isLoadingBookmarks = false;
    });
  }
  OnDestroy() {
    this.updateProfile.unsubscribe();
  }

  getMyProfileData() {
    if (this.isLoadingUserData) return;
    this.isLoadingUserData = true;
    this.profileService.getMyProfileData().subscribe({
      next: (res: IProfileRes) => {
        this.userData = res.data.user;
        this.isLoadingUserData = false;
      },
      error: (err) => {
        this.isLoadingUserData = false;
      },
    });
  }

  getBookMarkedPosts() {
    if (this.isLoadingBookmarks) return;
    this.isLoadingBookmarks = true;
    this.postsService.getBookmarksPosts(this.bookmarksPostsPage, 20).subscribe({
      next: (res) => {
        if (!res.data.bookmarks.length) this.bookmarksPostsNumber--;

        const newPosts = res.data.posts?.filter(
          (post: IPost) => !this.bookmarksPosts.some((p) => p._id === post._id),
        );
        if (newPosts) this.bookmarksPosts.push(...newPosts);

        this.setFilterPosts();
        this.bookmarksPostsNumber = res.meta.pagination.total;
        if (this.bookmarksPostsNumber < 10) this.bookmarksPostsNumber = this.bookmarksPosts.length;
        this.isLoadingBookmarks = false;
        this.isLoadingOnScroll = false;
      },
      error: (err) => {
        this.isLoadingBookmarks = false;
        this.isLoadingOnScroll = false;
      },
    });
  }

  getMyPosts() {
    if (this.isLoadingPosts) return;
    this.isLoadingPosts = true;
    this.postsService.getMyPosts(this.myPostsPage, 20).subscribe({
      next: (res) => {
        console.log(res);
        if (!res.data.posts.length) this.myPostsPage--;

        const newPosts = res.data.posts?.filter(
          (post: IPost) => !this.myPosts.some((p) => p._id === post._id),
        );

        this.myPosts.push(...newPosts);

        this.myPostsNumber = res.meta.pagination.total;
        this.setFilterPosts();
        this.isLoadingPosts = false;
        this.isLoadingOnScroll = false;
      },
      error: (err) => {
        this.isLoadingPosts = false;
        this.isLoadingOnScroll = false;
      },
    });
  }

  getFilterValue(value: 'posts' | 'bookmark') {
    this.filterValue = value;
    this.setFilterPosts();
  }
  setFilterPosts() {
    if (this.filterValue === 'posts') {
      this.falterPosts = this.myPosts;
      this.falterPostsNumber = this.myPostsNumber;
    } else {
      this.falterPosts = this.bookmarksPosts;
      this.falterPostsNumber = this.bookmarksPostsNumber;
    }
  }

  onScroll() {
    if (this.isLoadingOnScroll) return;
    this.isLoadingOnScroll = true;
    if (this.filterValue === 'posts') {
      this.myPostsPage++;
      this.getMyPosts();
    } else {
      this.bookmarksPostsPage++;
      this.getBookMarkedPosts();
    }
  }
}
