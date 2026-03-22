import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-posts',
  imports: [],
  templateUrl: './no-posts.component.html',
  styleUrl: './no-posts.component.css',
})
export class NoPostsComponent {
  @Input() text: string = '';
}
