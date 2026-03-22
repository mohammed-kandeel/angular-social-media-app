import { Component, inject, Input } from '@angular/core';
import { ViewImgPostComponent } from '../../../../shared/components/post/components/view-img-post/view-img-post.component';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { IUser } from '../../../../core/interfaces/i-user.interface';
import { IMyProfile } from '../../../../core/interfaces/iprofile-res.interface';
import { PrivacyModalComponent } from '../../../../shared/components/privacy-modal/privacy-modal.component';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { UpdateProfileService } from '../../services/update-profile.service';

@Component({
  selector: 'app-profile-cover',
  imports: [ViewImgPostComponent, PrivacyModalComponent],
  templateUrl: './profile-cover.component.html',
  styleUrl: './profile-cover.component.css',
})
export class ProfileCoverComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly profileService = inject(ProfileService);
  private readonly updateProfileService = inject(UpdateProfileService);

  @Input({ required: true }) userData!: IMyProfile;

  user: IUser = this.localStorageService.getUser();
  isViewImg: boolean = false;
  isModalOpen: boolean = false;
  file!: File | undefined;
  isLoading: boolean = false;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.file = file;
      this.openModal();
    }
  }

  onSaveCover(privacy: string) {
    const formData = new FormData();
    formData.append('cover', this.file!!);
    formData.append('privacy', privacy);
    this.upLoadCover(formData);
    this.closeModal();
  }

  upLoadCover(formData: FormData) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.profileService.uploadCover(formData).subscribe({
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

  removeCover() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.profileService.deleteCover().subscribe({
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
    this.closeModal();
  }

  onViewImg() {
    this.isViewImg = true;
  }
  onCloseImg(event: boolean) {
    this.isViewImg = !event;
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
