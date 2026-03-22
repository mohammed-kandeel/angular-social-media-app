import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../../../../core/constant/patterns';
import { FieldErrorsInputComponent } from '../../../../../../shared/components/field-errors-input/field-errors-input.component';
import { AuthFormTitleComponent } from '../../../../components/auth-form-title/auth-form-title.component';
import { IArrOfErrorsLogin } from '../../interfaces/i-arr-of-errors-login.interface';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { AuthMsgErrorComponent } from '../../../../components/auth-msg-error/auth-msg-error.component';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../../../../../core/services/local-storage/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../../../../../core/interfaces/i-user.interface';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    AuthFormTitleComponent,
    FieldErrorsInputComponent,
    AuthMsgErrorComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly LocalStorageService = inject(LocalStorageService);

  loading: boolean = false;
  msgError: string = '';
  formSubscriber: Subscription = new Subscription();

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.password.replaceAll('/', '')),
    ]),
  });
  arrOfErrors: IArrOfErrorsLogin = {
    login: [
      { errorName: 'required', message: 'Email or username is required.' },
      { errorName: 'minLength', message: 'Please enter a valid email or username.' },
    ],
    password: [
      { errorName: 'required', message: 'password is required' },
      {
        errorName: 'pattern',
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number and special character (#?!@$%^&*-).',
      },
    ],
  };

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  submitForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.formSubscriber.unsubscribe();

    this.formSubscriber = this.authService.login(this.loginForm.value).subscribe({
      next: (res: IUser) => {
        if (res.success) {
          this.LocalStorageService.setUser(res.data.user, res.data.token);
          this.router.navigate(['/feed']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
