import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmojiBtnComponent } from '../../../emoji-btn/emoji-btn.component';
import { LocalStorageService } from '../../../../../core/services/local-storage/local-storage.service';
import { IUser } from '../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-input-create-comment',
  imports: [EmojiBtnComponent, ReactiveFormsModule],
  templateUrl: './input-create-comment.component.html',
  styleUrl: './input-create-comment.component.css',
})
export class InputCreateCommentComponent {
  private readonly localStorageService = inject(LocalStorageService);

  @Input({ required: true }) post_comment_ID!: string;
  @Input({ required: true }) placeholder!: string;

  @Input({ required: true }) isLoadingInput!: boolean;

  @Output() data: EventEmitter<{ text?: string; file?: File }> = new EventEmitter();

  user: IUser = this.localStorageService.getUser();
  closeAmoji: boolean = false;

  image: string | ArrayBuffer | null | undefined;
  imageFile: File | null = null;

  textareaInput: FormControl = new FormControl('', Validators.minLength(2));
  isValid: boolean = false;

  // emoji
  addEmoji(emoji: any) {
    this.textareaInput.setValue(this.textareaInput.value + emoji);
    this.isValidComment();
  }

  // image
  onRemoveImage(): void {
    this.image = null;
    this.imageFile = null;
    this.isValid = false;
  }
  onGetImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const fileReader = new FileReader();
      this.imageFile = input.files[0];

      fileReader.readAsDataURL(this.imageFile);

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.image = e.target?.result;
        this.isValidComment();
      };
    }
  }

  // text
  onTextInput(): void {
    if (this.textareaInput.valid) this.isValid = true;
    else this.isValid = false;
  }

  // onPost
  onPost() {
    let data: any = {};
    if (this.textareaInput.valid) data.text = this.textareaInput.value;
    if (this.image) data.file = this.imageFile;

    this.resetInputs();
    this.data.emit(data);
  }

  //
  resetInputs(): void {
    this.onRemoveImage();
    this.textareaInput.reset('');
    this.closeAmoji = true;
  }
  isValidComment(): void {
    if (this.image || this.textareaInput) this.isValid = true;
    else this.isValid = false;
  }
}
