import { Component, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { ViewImgPostComponent } from '../../../../shared/components/post/components/view-img-post/view-img-post.component';
import { IUser } from '../../../../core/interfaces/i-user.interface';
import { IMyProfile } from '../../../../core/interfaces/iprofile-res.interface';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { UpdateProfileService } from '../../services/update-profile.service';
import { AdjustProfilePhotoModalComponent } from '../../../../shared/components/adjust-profile-photo-modal/adjust-profile-photo-modal.component';

@Component({
  selector: 'app-profile-user-avatar',
  imports: [ViewImgPostComponent, AdjustProfilePhotoModalComponent],
  templateUrl: './profile-user-avatar.component.html',
  styleUrl: './profile-user-avatar.component.css',
})
export class ProfileUserAvatarComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly profileService = inject(ProfileService);
  private readonly updateProfileService = inject(UpdateProfileService);

  @Input({ required: true }) userData!: IMyProfile;

  user: IUser = this.localStorageService.getUser();

  isViewImg: boolean = false;
  isLoading: boolean = false;
  isAdjustModalOpen: boolean = false;
  file!: File | undefined;

  onViewImg() {
    this.isViewImg = true;
  }
  onCloseImg(event: boolean) {
    this.isViewImg = !event;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.file = file;
      this.openAdjustModal();
    }
  }

  onSavePhoto(e: { privacy: string; file: File }) {
    const formData = new FormData();
    formData.append('photo', e.file);
    formData.append('privacy', e.privacy);
    this.uploadPhoto(formData);
    this.closeAdjustModal();
  }

  uploadPhoto(formData: FormData) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.profileService.uploadPhoto(formData).subscribe({
      next: () => {
        this.updateProfileService.onUpdateProfile();
        this.reSetValues();
      },
      error: () => {
        this.updateProfileService.onUpdateProfile();
        this.reSetValues();
      },
    });
  }

  reSetValues() {
    this.file = undefined;
    this.isLoading = false;
  }

  openAdjustModal() {
    this.isAdjustModalOpen = true;
  }
  closeAdjustModal() {
    this.isAdjustModalOpen = false;
  }
  onCloseAdjustModal() {
    this.isAdjustModalOpen = false;
    this.reSetValues();
  }
}
