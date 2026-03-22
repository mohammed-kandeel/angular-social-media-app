import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-follow-btn',
  imports: [],
  templateUrl: './profile-follow-btn.component.html',
  styleUrl: './profile-follow-btn.component.css',
})
export class ProfileFollowBtnComponent {
  @Input({ required: true }) isFollowing!: boolean;
  @Input({ required: true }) isFollowingLoading!: boolean;

  @Output() followingBtnAction: EventEmitter<void> = new EventEmitter();

  onclick() {
    if (this.isFollowingLoading) return;
    this.followingBtnAction.emit();
  }
}
