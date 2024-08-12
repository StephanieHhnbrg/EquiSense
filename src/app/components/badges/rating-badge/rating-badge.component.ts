import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-rating-badge',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './rating-badge.component.html',
  styleUrl: './rating-badge.component.css'
})
export class RatingBadgeComponent {

  @Input({ required: true }) public rating: number = 0;
  @Input({ required: true }) public criteria: string = "";

}
