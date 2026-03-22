import { Routes } from '@angular/router';

export const Profile_Routes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/profile-info-page/profile-info-page.component').then(
        (m) => m.ProfileInfoPageComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
  },
];
