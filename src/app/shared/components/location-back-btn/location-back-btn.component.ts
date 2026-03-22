import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-location-back-btn',
  imports: [],
  templateUrl: './location-back-btn.component.html',
  styleUrl: './location-back-btn.component.css',
})
export class LocationBackBtnComponent {
  private readonly location = inject(Location);

  onBackPage() {
    this.location.back();
  }
}
