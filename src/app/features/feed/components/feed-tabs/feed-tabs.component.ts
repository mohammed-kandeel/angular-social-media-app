import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-feed-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './feed-tabs.component.html',
  styleUrl: './feed-tabs.component.css',
})
export class FeedTabsComponent {
  readonly links = [
    {
      router: 'feed-posts',
      routerLinkActive: 'bg-indigo-50!',
      routerLinkActive2: 'from-indigo-500! to-purple-700!',
    },
    {
      router: 'my-posts',
      routerLinkActive: 'bg-indigo-50!',
      routerLinkActive2: 'from-indigo-500! to-purple-700!',
    },
    {
      router: 'community-posts',
      routerLinkActive: 'bg-indigo-50!',
      routerLinkActive2: 'from-indigo-500! to-purple-700!',
    },
    {
      router: 'saved-posts',
      routerLinkActive: 'bg-indigo-50!',
      routerLinkActive2: 'from-indigo-500! to-purple-700!',
    },
  ];
}
