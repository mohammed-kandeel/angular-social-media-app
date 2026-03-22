import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-emoji-btn',
  imports: [PickerComponent],
  templateUrl: './emoji-btn.component.html',
  styleUrl: './emoji-btn.component.css',
})
export class EmojiBtnComponent {
  @Input() amojiClass!: string;
  @Input() textClass!: string;
  @Input() text!: string;
  @Input() closeAmoji!: boolean;

  toggleAmoji: boolean = true;

  @Output() selectedAmoji: EventEmitter<string> = new EventEmitter();

  onToggleAmoji() {
    this.toggleAmoji = !this.toggleAmoji;
  }
  addEmoji(emoji: any) {
    this.selectedAmoji.emit(emoji.emoji.native);
  }

  ngOnChanges() {
    if (this.closeAmoji) {
      this.toggleAmoji = true;
    }
  }
}
