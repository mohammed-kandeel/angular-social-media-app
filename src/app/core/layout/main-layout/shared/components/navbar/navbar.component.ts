import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite, Collapse } from 'flowbite';
import { LocalStorageService } from '../../../../../services/local-storage/local-storage.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { CountNotificationService } from '../../../../../services/countNotification/count-notification.service';
import { NotificationsService } from '../../../../../services/notifications/notifications.service';
import { IUser } from '../../../../../interfaces/i-user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly LocalStorageService = inject(LocalStorageService);
  private readonly countNotificationService = inject(CountNotificationService);
  private readonly notificationsService = inject(NotificationsService);
  readonly userData: IUser = this.LocalStorageService.getUser();

  collapseUserDownMenu!: Collapse;
  collapseNavbar!: Collapse;
  totalNotifications!: number;

  @ViewChild('navbarButton') navbarButton!: ElementRef;
  @ViewChild('navbarMenu') navbarMenu!: ElementRef;
  @ViewChild('dropdownMenu') userDownMenu!: ElementRef;
  @ViewChild('userMenuButton') userMenuButton!: ElementRef;

  ngOnInit(): void {
    initFlowbite();
    this.getNotificationsCount();

    this.countNotificationService.countNotification.subscribe(() => {
      this.getNotificationsCount();
    });
  }
  ngAfterViewInit(): void {
    // user menu
    this.collapseUserDownMenu = new Collapse(
      this.userDownMenu.nativeElement,
      this.userMenuButton.nativeElement,
    );

    // navbar
    this.collapseNavbar = new Collapse(
      this.navbarMenu.nativeElement,
      this.navbarButton.nativeElement,
    );
  }

  // api call
  getNotificationsCount(): void {
    this.notificationsService.getNotificationsCount().subscribe({
      next: (res) => {
        this.totalNotifications = res.data.unreadCount;
      },
      error: () => {
        this.totalNotifications = 0;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  closeDropdownMenu(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // close navbar
    if (
      !this.navbarButton.nativeElement.contains(clickedElement) &&
      !this.navbarMenu.nativeElement.contains(clickedElement)
    ) {
      this.closeNavbarMenu();
    }

    // close user menu
    if (
      !this.userMenuButton.nativeElement.contains(clickedElement) &&
      !this.userDownMenu.nativeElement.contains(clickedElement)
    ) {
      this.closeUserDownMenu();
    }
  }

  closeNavbarMenu(): void {
    this.collapseNavbar.collapse();
  }
  closeUserDownMenu(): void {
    this.collapseUserDownMenu.collapse();
  }

  logout() {
    this.authService.logout();
  }
}
