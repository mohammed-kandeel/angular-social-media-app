import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent implements AfterContentInit, OnDestroy {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) title!: string;
  @Input() text: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isDeleting: boolean = false;

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Escape') this.onCancel();
  }

  @ViewChild('modal') modal!: ElementRef;
  onBgModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target !== this.modal.nativeElement) {
      this.onCancel();
    }
  }

  onConfirm() {
    this.isDeleting = true;
    this.confirm.emit();
  }
  onCancel() {
    if (this.isDeleting) return;
    this.cancel.emit();
  }

  ngAfterContentInit(): void {
    document.body.classList.add('overflow-hidden');
  }
  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }
}
