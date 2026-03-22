import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-load-more-comments-btn',
  imports: [],
  templateUrl: './post-load-more-comments-btn.component.html',
  styleUrl: './post-load-more-comments-btn.component.css',
})
export class PostLoadMoreCommentsBtnComponent {
  @Output() isLoadingMoreComments: EventEmitter<boolean> = new EventEmitter();

  loadMore(): void {
    this.isLoadingMoreComments.emit(true);
  }
}
