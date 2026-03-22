import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileNameUserNameComponent } from '../../../../components/profile-name-user-name/profile-name-user-name.component';
import { ProfileUserAvatarComponent } from '../../../../components/profile-user-avatar/profile-user-avatar.component';
import { ProfileCoverComponent } from '../../../../components/profile-cover/profile-cover.component';
import { ProfileFollowBtnComponent } from '../../../../components/profile-follow-btn/profile-follow-btn.component';
import { IMyProfile } from '../../../../../../core/interfaces/iprofile-res.interface';
import { LocationBackBtnComponent } from '../../../../../../shared/components/location-back-btn/location-back-btn.component';

@Component({
  selector: 'app-top-section',
  imports: [
    ProfileNameUserNameComponent,
    ProfileUserAvatarComponent,
    ProfileCoverComponent,
    ProfileFollowBtnComponent,
    LocationBackBtnComponent,
  ],
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.css',
})
export class TopSectionComponent {
  @Input({ required: true }) userData!: IMyProfile;
  @Input({ required: true }) isFollowing!: boolean;
  @Input({ required: true }) isFollowingLoading!: boolean;

  @Output() followingBtnAction: EventEmitter<void> = new EventEmitter();

  onFollowingBtnAction() {
    this.followingBtnAction.emit();
  }
}
