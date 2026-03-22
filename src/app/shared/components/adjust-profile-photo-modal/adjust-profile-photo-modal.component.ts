import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-adjust-profile-photo-modal',
  imports: [ImageCropperComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './adjust-profile-photo-modal.component.html',
  styleUrl: './adjust-profile-photo-modal.component.css',
})
export class AdjustProfilePhotoModalComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly fb = inject(FormBuilder);

  @Input({ required: true }) file!: File;
  @Output() onSavePhoto: EventEmitter<{ privacy: string; file: File }> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  privacyInput: FormControl = this.fb.control('public');
  zoom: number = 1;
  newFile!: File;

  onZoomChange(zoom: number) {
    this.zoom = zoom;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.newFile = new File([event.blob!], 'profile.jpg', { type: event.blob?.type });
  }

  cancelClick() {
    this.onCancel.emit();
  }
  saveClick() {
    this.onSavePhoto.emit({ privacy: this.privacyInput.value, file: this.newFile });
  }

  ngOnInit(): void {
    document.body.classList.add('overflow-hidden');
  }
  ngOnDestroy() {
    document.body.classList.remove('overflow-hidden');
  }
}
