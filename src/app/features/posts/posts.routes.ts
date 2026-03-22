import { Routes } from '@angular/router';

export const Posts_Routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/posts-page/posts-page.component').then((m) => m.PostsPageComponent),
  },
];
