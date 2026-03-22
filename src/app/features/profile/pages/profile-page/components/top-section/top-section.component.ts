import { Component, Input } from '@angular/core';
import { ProfileCoverComponent } from '../../../../components/profile-cover/profile-cover.component';
import { ProfileUserAvatarComponent } from '../../../../components/profile-user-avatar/profile-user-avatar.component';
import { ProfileNameUserNameComponent } from '../../../../components/profile-name-user-name/profile-name-user-name.component';
import { ProfileFollowInfoCardsComponent } from '../../../../components/profile-follow-info-cards/profile-follow-info-cards.component';
import { ProfileAboutCardComponent } from '../../../../components/profile-about-card/profile-about-card.component';
import { ProfilePostsInfoCardsComponent } from '../../../../components/profile-posts-info-cards/profile-posts-info-cards.component';
import { IMyProfile } from '../../../../../../core/interfaces/iprofile-res.interface';

@Component({
  selector: 'app-top-section',
  imports: [
    ProfileCoverComponent,
    ProfileUserAvatarComponent,
    ProfileNameUserNameComponent,
    ProfileFollowInfoCardsComponent,
    ProfileAboutCardComponent,
    ProfilePostsInfoCardsComponent,
  ],
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.css',
})
export class TopSectionComponent {
  @Input({ required: true }) userData!: IMyProfile;
  @Input({ required: true }) postsNumber!: string;
}
