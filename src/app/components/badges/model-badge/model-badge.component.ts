import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-model-badge',
  standalone: true,
  imports: [],
  templateUrl: './model-badge.component.html',
  styleUrl: './model-badge.component.css'
})
export class ModelBadgeComponent {

  @Input({ required: true }) public model: string = "";

}
