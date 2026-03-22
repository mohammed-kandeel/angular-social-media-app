import { Component, Input } from '@angular/core';
import { IMyProfile } from '../../../../core/interfaces/iprofile-res.interface';

@Component({
  selector: 'app-profile-about-card',
  imports: [],
  templateUrl: './profile-about-card.component.html',
  styleUrl: './profile-about-card.component.css',
})
export class ProfileAboutCardComponent {
  @Input({ required: true }) userData!: IMyProfile;
}
