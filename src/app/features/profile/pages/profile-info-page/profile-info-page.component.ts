import { Component, inject } from '@angular/core';
import { SkeletonTopSectionComponent } from '../profile-page/components/skeleton-top-section/skeleton-top-section.component';
import { SkeletonSharedPostComponent } from '../../../../shared/components/skeleton-shared-post/skeleton-shared-post.component';
import { TopSectionComponent } from './components/top-section/top-section.component';
import { ProfileViewPostsComponent } from '../../components/profile-view-posts/profile-view-posts.component';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { IMyProfile, IProfileRes } from '../../../../core/interfaces/iprofile-res.interface';
import { IPost } from '../../../../core/interfaces/i-post.interface';
import { SuggestedFriendsService } from '../../../../core/services/suggested-friends/suggested-friends.service';
import { InfiniteScrollComponent } from '../../../../shared/components/infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-profile-info-page',
  imports: [
    SkeletonSharedPostComponent,
    TopSectionComponent,
    ProfileViewPostsComponent,
    SkeletonTopSectionComponent,
    InfiniteScrollComponent,
  ],
  templateUrl: './profile-info-page.component.html',
  styleUrl: './profile-info-page.component.css',
})
export class ProfileInfoPageComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly profileService = inject(ProfileService);
  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly suggestedFriendsService = inject(SuggestedFriendsService);

  userId!: string;
  userData!: IMyProfile;

  posts: IPost[] = [];
  postsPage: number = 1;
  postsNumber!: number;

  isLoadingUserData: boolean = false;
  isLoadingPosts: boolean = false;
  isLoadingOnScroll: boolean = false;

  isFollowing!: boolean;
  isFollowingLoading!: boolean;

  constructor() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!;

    if (this.localStorageService.getUser()._id === this.userId) this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
    this.getProfileData();
    this.getPosts();
  }

  getProfileData() {
    if (this.isLoadingUserData) return;
    this.isLoadingUserData = true;
    this.profileService.getUserProfileData(this.userId).subscribe({
      next: (res: IProfileRes) => {
        this.userData = res.data.user;
        this.isFollowing = res.data.isFollowing!!;

        this.isLoadingUserData = false;
      },
      error: () => {
        this.isLoadingUserData = false;
        this.goBack();
      },
    });
  }

  getPosts() {
    if (this.isLoadingPosts) return;
    this.isLoadingPosts = true;
    this.postsService.getUserPosts(this.userId, this.postsPage, 20).subscribe({
      next: (res) => {
        if (!res.data.posts.length) this.postsPage--;

        const newPosts = res.data.posts?.filter(
          (post: IPost) => !this.posts.some((p) => p._id === post._id),
        );
        if (newPosts) this.posts.push(...newPosts);

        this.postsNumber = res.meta.pagination.total;
        this.isLoadingPosts = false;
        this.isLoadingOnScroll = false;
      },
      error: (err) => {
        this.isLoadingPosts = false;
        this.isLoadingOnScroll = false;
        this.goBack();
      },
    });
  }

  onScroll() {
    if (this.isLoadingOnScroll) return;
    this.isLoadingOnScroll = true;
    this.postsPage++;
    this.getPosts();
  }

  goBack() {
    this.location.back();
  }

  // follow Action
  onFollowingBtnAction() {
    if (this.isFollowingLoading) return;
    this.isFollowingLoading = true;
    this.suggestedFriendsService.toggleFollow(this.userData._id).subscribe({
      next: (res) => {
        this.isFollowingLoading = false;
        this.isFollowing = res.data.following;
      },
      error: () => {
        this.isFollowingLoading = false;
      },
    });
  }
}
