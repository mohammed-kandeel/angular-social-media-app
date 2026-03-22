import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'auth-buttons',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
})
export class ButtonsComponent {}
