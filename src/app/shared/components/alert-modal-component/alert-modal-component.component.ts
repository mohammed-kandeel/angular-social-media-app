import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alert-modal-component',
  imports: [],
  templateUrl: './alert-modal-component.component.html',
  styleUrl: './alert-modal-component.component.css',
})
export class AlertModalComponentComponent {
  @Input() isOpen = false;
  @Input() type: 'success' | 'error' = 'success';
  @Input() title = '';
  @Input() message = '';
  @Input() duration = 2000; // auto close

  ngOnChanges() {
    if (this.isOpen) {
      setTimeout(() => {
        this.isOpen = false;
      }, this.duration);
    }
  }
}
