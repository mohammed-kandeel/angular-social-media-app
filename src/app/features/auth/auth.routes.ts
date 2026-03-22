import { Routes } from '@angular/router';
import { Tap_Title } from '../../core/constant/tap-title';

export const Auth_Routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Sign In' + Tap_Title,
    loadComponent: () =>
      import('./pages/login/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: 'register',
    title: 'Create Account' + Tap_Title,
    loadComponent: () =>
      import('./pages/register/pages/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent,
      ),
  },
  {
    path: 'forgot-password',
    redirectTo: 'login',
  },
  {
    path: 'forgot-password',
    title: 'forgot password' + Tap_Title,
    loadComponent: () =>
      import('./pages/forgot-password/pages/forgot-password-page/forgot-password-page.component').then(
        (m) => m.ForgotPasswordPageComponent,
      ),
  },
];
