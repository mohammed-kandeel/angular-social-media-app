import { Component, HostBinding, Input } from '@angular/core';
import { IMyProfile } from '../../../../core/interfaces/iprofile-res.interface';

@Component({
  selector: 'app-profile-name-user-name',
  imports: [],
  templateUrl: './profile-name-user-name.component.html',
  styleUrl: './profile-name-user-name.component.css',
})
export class ProfileNameUserNameComponent {
  @HostBinding('class')
  @Input()
  hostClass!: string;
  @Input({ required: true }) userData!: IMyProfile;
}
