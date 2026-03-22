import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PostsService } from '../../../core/services/posts/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponentComponent } from '../alert-modal-component/alert-modal-component.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IPost } from '../../../core/interfaces/i-post.interface';

@Component({
  selector: 'app-share-post-modal',
  imports: [ReactiveFormsModule, AlertModalComponentComponent],
  templateUrl: './share-post-modal.component.html',
  styleUrl: './share-post-modal.component.css',
})
export class SharePostModalComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(PostsService);

  @Input({ required: true }) post!: IPost;
  @Output() modalEvent = new EventEmitter<{ update: boolean }>();

  textInput: FormControl = new FormControl('');
  isLoading: boolean = false;
  duration = 2000;

  ngOnInit(): void {
    document.body.classList.add('overflow-hidden');
  }
  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Escape') this.modalEvent.emit({ update: false });
  }

  @ViewChild('modal') modal!: ElementRef;
  onCloseModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target !== this.modal.nativeElement) {
      this.modalEvent.emit({ update: false });
    }
  }
  onBgModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target !== this.modal.nativeElement && !this.modal.nativeElement.contains(target)) {
      this.modalEvent.emit({ update: false });
    }
  }
  onsubmitPoste(e: SubmitEvent) {
    e.preventDefault();
    if (this.isLoading) return;
    this.isLoading = true;

    this.postsService.sharePost(this.post._id, { body: this.textInput.value }).subscribe({
      next: () => {
        this.isLoading = false;
        this.success();
        setTimeout(() => {
          this.modalEvent.emit({ update: true });
        }, this.duration - 500);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.error(err.error.message);
        setTimeout(() => {
          this.modalEvent.emit({ update: false });
        }, this.duration);
      },
    });
  }

  showAlert = false;
  alertType: 'success' | 'error' = 'success';
  alertTitle = '';
  alertMessage = '';

  success() {
    this.alertType = 'success';
    this.alertTitle = 'Success';
    this.alertMessage = 'Post shared successfully';
    this.showAlert = true;
  }

  error(alertMessage: string) {
    this.alertType = 'error';
    this.alertTitle = 'Error';
    this.alertMessage = alertMessage;
    this.showAlert = true;
  }
}
