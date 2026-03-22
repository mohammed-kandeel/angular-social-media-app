import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

@Component({
  selector: 'app-privacy-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './privacy-modal.component.html',
  styleUrl: './privacy-modal.component.css',
})
export class PrivacyModalComponent {
  private readonly fb = inject(FormBuilder);

  @Input() title: string = 'Cover post privacy';
  @Input() text: string = 'Choose who can see the post';

  @Output() oncancel: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<string> = new EventEmitter();

  privacy: FormControl = this.fb.control('public');

  cancelClick() {
    this.oncancel.emit();
  }
  saveClick() {
    this.onSave.emit(this.privacy.value);
  }
}
