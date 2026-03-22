import { Component, HostBinding, Input, OnInit, OnChanges } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IMyProfile } from '../../../../core/interfaces/iprofile-res.interface';

@Component({
  selector: 'app-profile-follow-info-cards',
  imports: [CardComponent],
  templateUrl: './profile-follow-info-cards.component.html',
  styleUrl: './profile-follow-info-cards.component.css',
})
export class ProfileFollowInfoCardsComponent {
  @HostBinding('class')
  @Input()
  hostClass!: string;
  @Input({ required: true }) userData!: IMyProfile;

  cards!: {
    title: string;
    content: string;
  }[];

  ngAfterContentChecked(): void {
    this.cards = [
      {
        title: 'Followers',
        content: `${this.userData.followersCount}`,
      },
      {
        title: 'Following',
        content: `${this.userData.followingCount}`,
      },
      {
        title: 'Bookmarks',
        content: `${this.userData.bookmarksCount}`,
      },
    ];
  }
}
