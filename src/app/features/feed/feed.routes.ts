import { Routes } from '@angular/router';

export const Feed_Routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./pages/feed-page/feed-page.component').then((m) => m.FeedPageComponent),

    children: [
      { path: '', redirectTo: 'feed-posts', pathMatch: 'prefix' },
      {
        path: 'feed-posts',
        loadComponent: () =>
          import('./components/feed-posts/feed-posts.component').then((m) => m.FeedPostsComponent),
      },
      {
        path: 'my-posts',
        loadComponent: () =>
          import('./components/my-posts/my-posts.component').then((m) => m.MyPostsComponent),
      },
      {
        path: 'community-posts',
        loadComponent: () =>
          import('./components/community-posts/community-posts.component').then(
            (m) => m.CommunityPostsComponent,
          ),
      },
      {
        path: 'saved-posts',
        loadComponent: () =>
          import('./components/saved-posts/saved-posts.component').then(
            (m) => m.SavedPostsComponent,
          ),
      },
    ],
  },
];
