import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-msg-error',
  imports: [],
  templateUrl: './auth-msg-error.component.html',
  styleUrl: './auth-msg-error.component.css',
})
export class AuthMsgErrorComponent {
  @Input({ required: true }) msgError!: string;
}
