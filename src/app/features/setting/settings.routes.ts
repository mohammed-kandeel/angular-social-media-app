import { Routes } from '@angular/router';

export const Setting_Routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./pages/setting-page/setting-page.component').then((m) => m.SettingPageComponent),
  },
];
