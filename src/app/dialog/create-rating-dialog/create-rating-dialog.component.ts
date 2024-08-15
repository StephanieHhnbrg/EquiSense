import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  model,
  ModelSignal,
  OnInit
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA, MatDialog,
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
import {Criteria} from "../../data/criteria.data";
import {Subject} from "rxjs";
import {RatingParam} from "../../data/rating.data";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {PromptCustomizationComponent} from "../../components/edit-prompting-link/prompt-customization.component";
import { RatingService } from '../../services/rating.service';
import { CriteriaService } from '../../services/criteria.service';
import {AddTopicDialogComponent} from "../add-topic-dialog/add-topic-dialog.component";
import {CriteriaDialogComponent} from "../criteria-dialog/criteria-dialog.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-rating-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatCheckboxModule, PromptCustomizationComponent, MatIconModule],
  templateUrl: './create-rating-dialog.component.html',
  styleUrl: './create-rating-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRatingDialogComponent implements OnInit {

  public models = Object.values(Model);
  public criteria: Criteria[] = [];
  public responseModels: Model[] = [];
  public responseModelsParam: Model[] = [];
  private updatedPrompt: string | undefined;
  private readonly dialog = inject(MatDialog);


  constructor(private ref: ChangeDetectorRef,
            private ratingService: RatingService,
            private criteriaService: CriteriaService,
            @Inject(MAT_DIALOG_DATA) public data: { responseModels: Model[], ratingInputSelected$: Subject<RatingParam> }) {}

  public ngOnInit() {
    this.responseModels = [...this.data.responseModels];
    this.responseModelsParam = [...this.data.responseModels];
    this.criteria = this.criteriaService.getCriteria();
  }

  public selectRatingParams(ratingModel: Model, criteria: Criteria) {
    this.data.ratingInputSelected$.next({criteria, ratingModel, responseModels: this.responseModelsParam, updatedPrompt: this.updatedPrompt})
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

  public updatePrompt(prompt: string) {
    this.updatedPrompt = prompt;
  }

  public getRatingGenerationPrompt(criteria: Criteria | undefined): string {
    return this.ratingService.getPrompt(criteria);
  }

  public openCriteriaDialog(): void {
    this.dialog.open(CriteriaDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms'
    });
  }

}
