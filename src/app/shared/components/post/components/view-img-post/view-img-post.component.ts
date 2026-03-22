import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-view-img-post',
  imports: [],
  templateUrl: './view-img-post.component.html',
  styleUrl: './view-img-post.component.css',
})
export class ViewImgPostComponent implements AfterContentInit, OnDestroy {
  @Input({ required: true }) img!: string;
  @Output() closeImag: EventEmitter<boolean> = new EventEmitter();

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Escape') this.closeImag.emit(true);
  }

  @ViewChild('image') image!: ElementRef;

  ngAfterContentInit(): void {
    document.body.classList.add('overflow-hidden');
  }
  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }

  onCloseImg(event: Event) {
    const target = event.target as HTMLElement;
    if (target !== this.image.nativeElement) {
      this.closeImag.emit(true);
    }
  }
}
