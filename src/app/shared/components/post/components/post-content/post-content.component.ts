import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../../../core/services/posts/posts.service';
import { SharedPostComponent } from '../../../shared-post/shared-post.component';
import { ViewImgPostComponent } from '../view-img-post/view-img-post.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FieldErrorsInputComponent } from '../../../field-errors-input/field-errors-input.component';
import { IPost } from '../../../../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-post-content',
  imports: [
    ReactiveFormsModule,
    SharedPostComponent,
    ViewImgPostComponent,
    FieldErrorsInputComponent,
  ],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.css',
})
export class PostContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  @Input({ required: true }) post!: IPost;
  @Input({ required: true }) isEditPost!: boolean;
  @Output() isEditDone: EventEmitter<boolean> = new EventEmitter();

  textareaInput!: FormControl;
  postContent: string = '';

  isSaving: boolean = false;
  isViewImg: boolean = false;

  ngOnInit(): void {
    this.postContent = this.post.body || '';
    this.textareaInput = new FormControl(this.post?.body ?? '', [
      Validators.required,
      Validators.minLength(1),
    ]);
  }

  onSubmitEdit(e: Event): void {
    e.preventDefault();

    if (!this.textareaInput.value) return;
    if (this.isSaving) return;

    this.isSaving = true;

    this.postsService.updatePost({ body: this.textareaInput.value }, this.post._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.post.body = this.textareaInput.value;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.resetEditState();
      },
      complete: () => {
        this.resetEditState();
      },
    });
  }

  onCancelEdit(): void {
    if (this.isSaving) return;
    this.resetEditState();
  }

  resetEditState() {
    this.textareaInput.setValue(this.post.body);
    this.postContent = this.post.body || '';
    this.isSaving = false;
    this.isEditDone.emit(false);
  }

  onViewImg() {
    this.isViewImg = true;
  }
  onCloseImg(event: boolean) {
    if (event) this.isViewImg = false;
  }
}
