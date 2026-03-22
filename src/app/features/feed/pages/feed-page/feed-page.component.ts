import { Component, ElementRef, ViewChild } from '@angular/core';
import { FeedTabsComponent } from '../../components/feed-tabs/feed-tabs.component';
import { RouterOutlet } from '@angular/router';
import { SuggestedFriendsComponent } from '../../components/suggested-friends/suggested-friends.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';

@Component({
  selector: 'app-feed-page',
  imports: [FeedTabsComponent, RouterOutlet, SuggestedFriendsComponent, CreatePostComponent],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
})
export class FeedPageComponent {}
