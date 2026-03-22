import { Component, EventEmitter, Output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-infinite-scroll',
  imports: [InfiniteScrollDirective],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css',
})
export class InfiniteScrollComponent {
  @Output() onScroll: EventEmitter<void> = new EventEmitter();

  scroll() {
    this.onScroll.emit();
  }
}
