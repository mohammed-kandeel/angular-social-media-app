import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IFriend } from '../../../features/feed/interfaces/friend.interface';
import { SuggestedFriendsService } from '../../../core/services/suggested-friends/suggested-friends.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-suggested-friend-card',
  imports: [RouterLink],
  templateUrl: './suggested-friend-card.component.html',
  styleUrl: './suggested-friend-card.component.css',
})
export class SuggestedFriendCardComponent {
  private readonly suggestedFriendsService = inject(SuggestedFriendsService);

  @Input({ required: true }) friend!: IFriend;
  @Output() updateDataEvent: EventEmitter<boolean> = new EventEmitter();
  @Input({ required: true }) isLoading: boolean = false;

  toggleFollowFriend(): void {
    this.isLoading = true;
    this.suggestedFriendsService.toggleFollow(this.friend._id).subscribe({
      next: (res) => {
        this.updateDataEvent.emit(true);
      },
      error: (err: HttpErrorResponse) => {
        this.updateDataEvent.emit(false);
        this.isLoading = false;
      },
    });
  }
}
