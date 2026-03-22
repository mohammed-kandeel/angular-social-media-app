import { Component, HostListener } from '@angular/core';
import { AboutRouteComponent } from './shared/components/about-route/about-route.component';
import { TitleComponent } from './shared/components/title/title.component';
import { RouterOutlet } from '@angular/router';
import { ButtonsComponent } from '../../../features/auth/components/auth-buttons/auth-buttons.component';

@Component({
  selector: 'app-auth-layout',
  imports: [AboutRouteComponent, TitleComponent, RouterOutlet, ButtonsComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  readonly size = 1024;
  isLargeScreen = window.innerWidth > this.size;
  @HostListener('window:resize')
  onResize(): void {
    this.isLargeScreen = window.innerWidth > this.size;
  }
}
