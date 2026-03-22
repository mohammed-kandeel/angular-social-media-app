import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuggestedFriendCardComponent } from '../../../../shared/components/suggested-friend-card/suggested-friend-card.component';
import { SkeletonsSuggestedFriendCardComponent } from '../skeletons-suggested-friend-card/skeletons-suggested-friend-card.component';
import { SuggestedFriendsService } from '../../../../core/services/suggested-friends/suggested-friends.service';
import { IFriend } from '../../interfaces/friend.interface';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-suggested-friends',
  imports: [
    FormsModule,
    SuggestedFriendCardComponent,
    SkeletonsSuggestedFriendCardComponent,
    SkeletonsSuggestedFriendCardComponent,
    SuggestedFriendCardComponent,
    RouterLink,
  ],
  templateUrl: './suggested-friends.component.html',
  styleUrl: './suggested-friends.component.css',
})
export class SuggestedFriendsComponent implements OnInit {
  private readonly suggestedFriendsService = inject(SuggestedFriendsService);

  suggestedFriends: IFriend[] = [];

  binding: string = '';
  isOpen: boolean = false;
  isLoading: boolean = false;
  isLoadingNewFriendsBtn = false;
  searchForSuggestedFriendSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.getSuggestedFriends();
    this.isOpen = this.windowScreenX() > 780;
  }

  windowScreenX() {
    return window.innerWidth;
  }

  toggleSuggestedFriends(): void {
    this.isOpen = !this.isOpen && this.windowScreenX() < 780;
  }

  searchForSuggestedFriend(): void {
    this.searchForSuggestedFriendSub.unsubscribe();
    this.isLoading = true;

    this.searchForSuggestedFriendSub = this.suggestedFriendsService
      .getSearchFriends(this.binding, 1, 4)
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

  getSuggestedFriends(): void {
    this.isLoading = true;
    this.suggestedFriendsService.getSuggestionsFriends(4).subscribe({
      next: (res) => {
        this.suggestedFriends = res.data.suggestions;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  updateFriends(event: boolean): void {
    if (event) {
      this.suggestedFriendsService.getSuggestionsFriends(4).subscribe({
        next: (res) => {
          this.suggestedFriends = res.data.suggestions;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
        complete: () => {
          this.isLoadingNewFriendsBtn = false;
        },
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if ((event.currentTarget as Window).innerWidth > 780) this.isOpen = true;
    else this.isOpen = false;
  }
}
