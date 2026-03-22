import { Component, HostBinding, Input } from '@angular/core';
import { SharedPostComponent } from '../../../../shared/components/shared-post/shared-post.component';
import { NoPostsComponent } from '../../../../shared/components/no-posts/no-posts.component';
import { IPost } from '../../../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-profile-view-posts',
  imports: [SharedPostComponent, NoPostsComponent],
  templateUrl: './profile-view-posts.component.html',
  styleUrl: './profile-view-posts.component.css',
})
export class ProfileViewPostsComponent {
  @HostBinding('class')
  class = 'flex flex-col gap-4';

  @Input({ required: true }) posts!: IPost[];
}
