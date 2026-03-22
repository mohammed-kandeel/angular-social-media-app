import { Component, HostListener } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { CardComponent } from '../../../../../../shared/components/card/card.component';

@Component({
  selector: 'app-about-route',
  imports: [TitleComponent, CardComponent],
  templateUrl: './about-route.component.html',
  styleUrl: './about-route.component.css',
})
export class AboutRouteComponent {
  readonly size = 1024;
  isLargeScreen = window.innerWidth > this.size;

  cardClass =
    'bg-linear-to-br from-blue-50 to-teal-50 border-blue-200 hover:from-blue-100 hover:to-teal-100 transition duration-300';
  titleClass = 'text-indigo-900 font-bold text-lg';
  contentClass = 'text-blue-900 font-bold text-[10px]  h-full';

  cards = [
    {
      title: '1M+',
      content: 'Active Users',
    },
    {
      title: '750K+',
      content: 'Posts Shared',
    },
    {
      title: '2M+',
      content: 'Likes & Reactions',
    },
    {
      title: '180+',
      content: 'Countries',
    },
    {
      title: '24/7',
      content: 'Community Activity',
    },
  ];

  @HostListener('window:resize')
  onResize(): void {
    this.isLargeScreen = window.innerWidth > this.size;
  }
}
