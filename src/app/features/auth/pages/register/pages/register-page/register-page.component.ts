import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldErrorsInputComponent } from '../../../../../../shared/components/field-errors-input/field-errors-input.component';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthMsgErrorComponent } from '../../../../components/auth-msg-error/auth-msg-error.component';
import { Patterns } from '../../../../../../core/constant/patterns';
import { AuthFormTitleComponent } from '../../../../components/auth-form-title/auth-form-title.component';
import { IArrOfErrorsRegister } from '../../interfaces/i-arr-of-errors-register.interface';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    FieldErrorsInputComponent,
    AuthMsgErrorComponent,
    AuthFormTitleComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  msgError: string = '';
  loading: boolean = false;
  registerSubscribe: Subscription = new Subscription();

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      username: new FormControl(''),

      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.password.replaceAll('/', '')),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: this.confirmRePassword },
  );

  arrOfErrors: IArrOfErrorsRegister = {
    name: [
      { errorName: 'required', message: 'full Name is required' },
      { errorName: 'minlength', message: 'Minimum 3 characters' },
      { errorName: 'maxlength', message: 'Maximum 20 characters' },
    ],
    email: [
      { errorName: 'required', message: 'email is required' },
      { errorName: 'email', message: 'invalid email' },
    ],
    gender: [{ errorName: 'required', message: 'gender is required' }],
    dateOfBirth: [{ errorName: 'required', message: 'Date Of Birth is required' }],
    password: [
      { errorName: 'required', message: 'password is required' },
      {
        errorName: 'pattern',
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number and special character (#?!@$%^&*-).',
      },
    ],
    rePassword: [
      { errorName: 'required', message: 'Please confirm your password .' },
      { errorName: 'mismatch', message: 'Passwords do not match .' },
    ],
  };

  confirmRePassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    rePassword;
    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  submitForm(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.registerSubscribe.unsubscribe();

    this.registerSubscribe = this.authService.signUp(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.success) this.router.navigate(['/login']);
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

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }
}
