import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) cardClass!: string;
  @Input({ required: true }) titleClass!: string;
  @Input({ required: true }) contentClass!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) content!: string;
}
