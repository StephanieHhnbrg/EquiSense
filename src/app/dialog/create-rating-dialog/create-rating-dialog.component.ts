import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, model, ModelSignal, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {Model} from "../../data/model.data";
import {Criteria, CRITERIA_LIST} from "../../data/criteria.data";
import {Subject} from "rxjs";
import {RatingParam} from "../../data/rating.data";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-rating-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatCheckboxModule],
  templateUrl: './create-rating-dialog.component.html',
  styleUrl: './create-rating-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRatingDialogComponent implements OnInit {

  public models = Object.values(Model);
  public criteria: Criteria[] = CRITERIA_LIST;
  public responseModels: Model[] = [];
  public responseModelsParam: Model[] = [];


  constructor(private ref: ChangeDetectorRef,
            @Inject(MAT_DIALOG_DATA) public data: { responseModels: Model[], ratingInputSelected$: Subject<RatingParam> }) {}

  public ngOnInit() {
    this.responseModels = [...this.data.responseModels];
    this.responseModelsParam = [...this.data.responseModels];
  }

  public selectRatingParams(ratingModel: Model, criteria: Criteria) {
    this.data.ratingInputSelected$.next({criteria, ratingModel, responseModels: this.responseModelsParam})
  }

  public updateAllCheckbox(checked: boolean) {
    if (checked) {
      this.responseModelsParam = [...this.data.responseModels];
    } else {
      this.responseModelsParam = [];
    }
    console.log(this.responseModelsParam);
    this.ref.detectChanges();

  }

  public updateModelCheckbox(model: Model, checked: boolean) {
    if (checked) {
      if (this.responseModelsParam.length == this.responseModels.length) {
        this.responseModelsParam = [model];
      } else if (this.responseModelsParam.find(m => m == model) == undefined) {
        this.responseModelsParam.push(model);
      }
    } else {
      this.responseModelsParam = this.responseModelsParam.filter(m => m != model);
    }
    console.log(this.responseModelsParam);
    this.ref.detectChanges();
  }

  public isModelChecked(model: Model): boolean {
    return this.responseModelsParam.length < this.responseModels.length && this.responseModelsParam.find(m => m == model) != undefined;
  }

}
