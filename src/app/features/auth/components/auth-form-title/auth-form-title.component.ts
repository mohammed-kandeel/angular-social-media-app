import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-form-title',
  imports: [],
  templateUrl: './auth-form-title.component.html',
  styleUrl: './auth-form-title.component.css',
})
export class AuthFormTitleComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
}
