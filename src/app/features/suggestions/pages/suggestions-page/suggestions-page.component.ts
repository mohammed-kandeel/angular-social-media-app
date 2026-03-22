import { Component, inject } from '@angular/core';
import { SuggestedFriendsService } from '../../../../core/services/suggested-friends/suggested-friends.service';
import { IFriend } from '../../../feed/interfaces/friend.interface';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SkeletonsSuggestedFriendCardComponent } from '../../../feed/components/skeletons-suggested-friend-card/skeletons-suggested-friend-card.component';
import { SuggestedFriendCardComponent } from '../../../../shared/components/suggested-friend-card/suggested-friend-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationBackBtnComponent } from '../../../../shared/components/location-back-btn/location-back-btn.component';

@Component({
  selector: 'app-suggestions-page',
  imports: [
    FormsModule,
    SkeletonsSuggestedFriendCardComponent,
    SuggestedFriendCardComponent,
    LocationBackBtnComponent,
  ],
  templateUrl: './suggestions-page.component.html',
  styleUrl: './suggestions-page.component.css',
})
export class SuggestionsPageComponent {
  private readonly suggestedFriendsService = inject(SuggestedFriendsService);

  suggestedFriends: IFriend[] = [];
  binding: string = '';
  isLoading: boolean = false;
  loadMoreFriends: number = 1;
  isLoadingFriendsFollowBtn = false;
  isLoadingViewFriendsBtn = false;
  searchForSuggestedFriendSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.getSuggestedFriends();
  }

  getSuggestedFriends(): void {
    this.loadMoreFriends = 1;
    this.isLoading = true;
    this.suggestedFriendsService.getSuggestionsFriends(20, 1).subscribe({
      next: (res) => {
        this.suggestedFriends = res.data.suggestions;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  searchForSuggestedFriend(): void {
    this.loadMoreFriends = 1;
    this.isLoading = true;
    this.searchForSuggestedFriendSub.unsubscribe();
    this.searchForSuggestedFriendSub = this.suggestedFriendsService
      .getSearchFriends(this.binding, 1, 20)
      .subscribe({
        next: (res) => {
          this.suggestedFriends = res.data.users;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  updateFriends(event: boolean) {
    let result: IFriend[] = [];

    for (let i = 1; i <= this.loadMoreFriends; i++) {
      if (event) {
        this.suggestedFriendsService.getSuggestionsFriends(20, i).subscribe({
          next: (res) => {
            result = [...result, ...res.data.suggestions];
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
          complete: () => {
            this.isLoadingFriendsFollowBtn = false;
            this.suggestedFriends = result;
          },
        });
      }
    }
  }

  onLoadMoreFriends() {
    this.loadMoreFriends++;
    this.isLoadingViewFriendsBtn = true;

    this.suggestedFriendsService.getSuggestionsFriends(20, this.loadMoreFriends).subscribe({
      next: (res) => {
        this.suggestedFriends = [...this.suggestedFriends, ...res.data.suggestions];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoadingViewFriendsBtn = false;
      },
      complete: () => {
        this.isLoadingViewFriendsBtn = false;
      },
    });
  }
}
