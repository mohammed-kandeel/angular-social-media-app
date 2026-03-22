import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-filter-posts-btns',
  imports: [],
  templateUrl: './profile-filter-posts-btns.component.html',
  styleUrl: './profile-filter-posts-btns.component.css',
})
export class ProfileFilterPostsBtnsComponent {
  @Input({ required: true }) postsNumber!: number;
  @Input({ required: true }) btnFilter!: 'posts' | 'bookmark';

  @Output() filterValue: EventEmitter<'posts' | 'bookmark'> = new EventEmitter();

  onFilterBtn(value: 'posts' | 'bookmark') {
    this.filterValue.emit(value);
  }
}
