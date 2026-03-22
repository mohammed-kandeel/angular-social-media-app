import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Patterns } from '../../../../core/constant/patterns';
import { IUser } from '../../../../core/interfaces/i-user.interface';
import { PasswordService } from '../../../../core/services/password/password.service';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { FieldErrorsInputComponent } from '../../../../shared/components/field-errors-input/field-errors-input.component';
import { IChangePasswordResponse } from '../../interfaces/ichange-password-response.interface';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-setting-change-password',
  imports: [FieldErrorsInputComponent, ReactiveFormsModule],
  templateUrl: './setting-change-password.component.html',
  styleUrl: './setting-change-password.component.css',
})
export class SettingChangePasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly passwordService = inject(PasswordService);
  private readonly localStorageService = inject(LocalStorageService);

  user: IUser = this.localStorageService.getUser();
  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess: string = '';

  formPassword: FormGroup = this.fb.group(
    {
      email: [this.user.email],
      currentPassword: [
        '',
        [Validators.required, Validators.pattern(Patterns.password.replaceAll('/', ''))],
      ],
      newPassword: [
        '',
        [Validators.required, Validators.pattern(Patterns.password.replaceAll('/', ''))],
      ],
      rePassword: ['', [Validators.required]],
    },
    { validators: this.confirmRePassword },
  );
  confirmRePassword(group: AbstractControl) {
    const newPassword = group.get('newPassword')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (newPassword !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
  arrOfErrors: any = {
    currentPassword: [
      { errorName: 'required', message: 'password is required' },
      {
        errorName: 'pattern',
        message: 'Invalid Password.',
      },
    ],
    newPassword: [
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

  submitForm(e: Event): void {
    e.preventDefault();
    this.formPassword.markAllAsTouched();
    if (this.formPassword.invalid) return;
    this.isLoading = true;
    this.msgError = '';
    this.msgSuccess = '';

    this.passwordService
      .updataPassword({
        password: this.formPassword.get('currentPassword')?.value,
        newPassword: this.formPassword.get('newPassword')?.value,
      })
      .subscribe({
        next: (res: IChangePasswordResponse) => {
          this.localStorageService.setToken(res.data.token);
          this.msgSuccess = res.message;
          this.formPassword.reset();
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
          this.formPassword.reset();
        },
      });
  }

  onInput() {
    this.msgError = '';
    this.msgSuccess = '';
  }
}
