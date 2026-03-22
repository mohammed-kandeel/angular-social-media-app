import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmojiBtnComponent } from '../../../../shared/components/emoji-btn/emoji-btn.component';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { UpdataPostsService } from '../../services/updata-posts.service';
import { IUser } from '../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, EmojiBtnComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly postsService = inject(PostsService);
  private updataPostsService = inject(UpdataPostsService);

  user: IUser = this.localStorageService.getUser();

  striates: string = 'public';
  closeAmoji: boolean = false;

  image: string | ArrayBuffer | null | undefined;
  imageFile: File | null = null;

  textareaInput: FormControl = new FormControl('');
  privacyInput: FormControl = new FormControl('public');

  isValid: boolean = false;
  isLoading: boolean = false;

  addEmoji(emoji: any) {
    this.textareaInput.setValue(this.textareaInput.value + emoji);
    this.isValidPost();
  }

  onRemoveImage(): void {
    this.image = null;
    this.imageFile = null;
    this.isValid = false;
  }

  isValidPost(): void {
    if (this.image || this.textareaInput) this.isValid = true;
    else this.isValid = false;
  }

  onTextInput(): void {
    if (this.textareaInput.value) this.isValid = true;
    else this.isValid = false;
  }
  onGetImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const fileReader = new FileReader();
      this.imageFile = input.files[0];

      fileReader.readAsDataURL(this.imageFile);

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.image = e.target?.result;
        this.isValidPost();
      };
    }
  }

  onPost(): void {
    if (!this.isValid || this.isLoading) return;

    this.isLoading = true;

    const formData = new FormData();

    formData.append('privacy', this.privacyInput.value);
    if (this.image) formData.append('image', this.imageFile!);
    if (this.textareaInput.value) formData.append('body', this.textareaInput.value);

    this.postsService.createPost(formData).subscribe({
      next: () => {
        this.updataPostsService.triggerRefresh();
        this.resetInputs();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetInputs(): void {
    this.onRemoveImage();
    this.privacyInput.reset('public');
    this.textareaInput.reset('');
    this.closeAmoji = true;
  }
}
