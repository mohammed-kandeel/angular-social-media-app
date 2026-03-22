import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostTitleComponent } from './components/post-title/post-title.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { PostFooterComponent } from './components/post-footer/post-footer.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { IPost } from '../../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-post',
  imports: [PostTitleComponent, PostContentComponent, PostFooterComponent, PostCommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input({ required: true }) post!: IPost;

  @Output() onDelete: EventEmitter<void> = new EventEmitter();

  toggleComments: boolean = false;
  isEditPost: boolean = false;

  editPost(event: boolean): void {
    this.isEditPost = event;
  }

  editDone(event: boolean): void {
    this.isEditPost = event;
  }

  onToggleComments(event: boolean) {
    this.toggleComments = event;
  }
  updateCommentsNumber(event: number) {
    this.post.commentsCount = event;
  }

  onDeletePost() {
    this.onDelete.emit();
  }
}
