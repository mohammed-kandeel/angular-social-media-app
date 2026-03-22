import { Component, HostBinding, Input } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IMyProfile } from '../../../../core/interfaces/iprofile-res.interface';

@Component({
  selector: 'app-profile-posts-info-cards',
  imports: [CardComponent],
  templateUrl: './profile-posts-info-cards.component.html',
  styleUrl: './profile-posts-info-cards.component.css',
})
export class ProfilePostsInfoCardsComponent {
  @HostBinding('class')
  @Input()
  hostClass!: string;
  @Input({ required: true }) userData!: IMyProfile;
  @Input({ required: true }) postsNumber!: string;

  statsCards!: { title: string; content: string }[];

  ngAfterContentChecked(): void {
    this.statsCards = [
      { title: 'My Posts', content: `${this.postsNumber}` },
      { title: 'Saved Posts', content: `${this.userData.bookmarksCount}` },
    ];
  }
}
