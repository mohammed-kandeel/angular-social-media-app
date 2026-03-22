import { Routes } from '@angular/router';

export const Suggested_Routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./pages/suggestions-page/suggestions-page.component').then(
        (m) => m.SuggestionsPageComponent,
      ),
  },
];
