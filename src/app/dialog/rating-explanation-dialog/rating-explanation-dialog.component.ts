import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {Response} from "../../data/response.data";
import { Rating } from '../../data/rating.data';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RatingBadgeComponent} from "../../components/badges/rating-badge/rating-badge.component";
import {ModelBadgeComponent} from "../../components/badges/model-badge/model-badge.component";

@Component({
  selector: 'app-rating-explanation-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RatingBadgeComponent, ModelBadgeComponent],
  templateUrl: './rating-explanation-dialog.component.html',
  styleUrl: './rating-explanation-dialog.component.css'
})
export class RatingExplanationDialogComponent {

  public response: Response;
  public ratings: Rating[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { response: Response, rating: Rating | undefined}) {
    this.response = this.data.response;
    if (this.data.rating) {
      this.ratings = [this.data.rating];
    } else {
      this.ratings = this.data.response.ratings;
    }
  }

}
