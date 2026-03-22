import { Routes } from '@angular/router';

import { Tap_Title } from './core/constant/tap-title';
import { Feed_Routes } from './features/feed/feed.routes';

import { Profile_Routes } from './features/profile/profile.routes';
import { Notifications_Routes } from './features/notifications/notifications.routes';
import { Setting_Routes } from './features/setting/settings.routes';
import { Auth_Routes } from './features/auth/auth.routes';
import { authGuard } from './core/guards/auth-guard';
import { gustGuard } from './core/guards/gust-guard';
import { Suggested_Routes } from './features/suggestions/suggestions.routes';
import { Posts_Routes } from './features/posts/posts.routes';

export const routes: Routes = [
  // auth
  {
    path: '',
    pathMatch: 'prefix',
    canActivate: [gustGuard],
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: Auth_Routes,
  },

  // main layout
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    pathMatch: 'prefix',
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        title: 'feed' + Tap_Title,
        children: Feed_Routes,
      },
      {
        path: 'profile',
        title: 'profile' + Tap_Title,
        children: Profile_Routes,
      },
      {
        path: 'notifications',
        title: 'notifications' + Tap_Title,
        children: Notifications_Routes,
      },
      {
        path: 'setting',
        title: 'setting' + Tap_Title,
        children: Setting_Routes,
      },
      {
        path: 'suggested',
        title: 'suggested' + Tap_Title,
        children: Suggested_Routes,
      },
      {
        path: 'posts',
        title: 'posts' + Tap_Title,
        children: Posts_Routes,
      },
    ],
  },

  // not found
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-fount-page/not-fount-page.component').then(
        (m) => m.NotFountPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
