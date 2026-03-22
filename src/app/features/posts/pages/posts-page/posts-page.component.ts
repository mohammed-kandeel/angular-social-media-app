import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/post/post.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { SkeletonsPostComponent } from '../../../../shared/components/skeletons-post/skeletons-post.component';
import { Location } from '@angular/common';
import { LocationBackBtnComponent } from '../../../../shared/components/location-back-btn/location-back-btn.component';
import { IPost } from '../../../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-posts-page',
  imports: [PostComponent, SkeletonsPostComponent, LocationBackBtnComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css',
})
export class PostsPageComponent implements OnInit {
  @HostBinding('class') className = ' min-h-screen   flex flex-col';

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly location = inject(Location);

  postId!: string;
  post!: IPost;

  constructor() {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.postsService.getSinglePost(this.postId).subscribe({
      next: (res) => {
        this.post = res.data.post;
      },
      error: (err) => {
        this.location.back();
      },
    });
  }

  onDelete() {
    this.location.back();
  }
}
