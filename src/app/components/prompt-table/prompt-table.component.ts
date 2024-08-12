import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Prompt } from '../../data/prompt.data';
import { ResponseService } from '../../services/response.service';
import { RatingService } from '../../services/rating.service';
import { Model } from '../../data/model.data';
import { Response } from '../../data/response.data';
import { Criteria } from '../../data/criteria.data';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {Rating, RatingParam} from "../../data/rating.data";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import { RatingExplanationDialogComponent } from '../../dialog/rating-explanation-dialog/rating-explanation-dialog.component';
import { CreateRatingDialogComponent } from '../../dialog/create-rating-dialog/create-rating-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { GenerateResponsesDialogComponent } from '../../dialog/generate-responses-dialog/generate-responses-dialog.component';
import { Subject, Subscription } from 'rxjs';
import {RatingBadgeComponent} from "../badges/rating-badge/rating-badge.component";
import { ModelBadgeComponent } from '../badges/model-badge/model-badge.component';
import {Topic} from "../../data/topic.data";
import {LoadingService} from "../../services/loading.service";
import {LoadingIconComponent} from "../loading-icon/loading-icon.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-prompt-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, RatingBadgeComponent, ModelBadgeComponent, LoadingIconComponent, MatPaginatorModule],
  templateUrl: './prompt-table.component.html',
  styleUrl: './prompt-table.component.css'
})
export class PromptTableComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly dialog = inject(MatDialog);
  @Input({ required: true }) public topic: Topic | undefined;
  public dataSource: MatTableDataSource<Prompt> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['position', 'prompt'];
  responseModels: Model[] = [];
  public models = Object.values(Model);
  public isResponseGenerationLoading = false;
  public isRatingGenerationLoading = false;

  private subscriptions: Subscription[] = [];

  constructor(private responseService: ResponseService,
              private ratingService: RatingService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.topic!.prompts);
    this.topic!.prompts.forEach(p => {
      for (let key of Array.from(p.responses.keys())) {
        if (!this.responseModels.includes(key)) {
          this.responseModels.push(key);
        }
      }
    });

    let responseColumns = this.responseModels.map(m => this.getResponseColumnLabel(m));
    this.displayedColumns = this.displayedColumns.concat(responseColumns);
    if (responseColumns.length == 0) {
      this.displayedColumns.push('response-tbg');
    }

    this.registerLoadingSubscriptions();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private registerLoadingSubscriptions() {
    this.subscriptions.push(this.loadingService.getPromptingLoadingObservable().subscribe(value => {
      this.dataSource = new MatTableDataSource(this.topic!.prompts);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }));

    this.subscriptions.push(this.loadingService.getResponsesLoadingObservable().subscribe(value => {
      if (this.topic!.name == value.topic) {
        this.isResponseGenerationLoading = value.loading > 0;
        console.log("Responses Loading: "+ value.loading + "," + this.isResponseGenerationLoading);
        if (!this.isResponseGenerationLoading) {
          this.dataSource = new MatTableDataSource(this.topic!.prompts);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }
      }
    }));

    this.subscriptions.push(this.loadingService.getRatingsLoadingObservable().subscribe(value => {
      if (this.topic!.name == value.topic) {
        this.isRatingGenerationLoading = value.loading > 0;
        console.log("Ratings Loading: "+ value.loading + "," + this.isRatingGenerationLoading);
        this.dataSource = new MatTableDataSource(this.topic!.prompts);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      }
    }));
  }

  public getResponseColumnLabel(model: Model): string {
    return `response-${model}`;
  }

  public openRatingExplanationDialog(response: Response, rating: Rating | undefined) {
    this.dialog.open(RatingExplanationDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {response, rating}
    });
  }

  public openCreateRatingDialog() {
    let ratingInputSelected$ = new Subject<RatingParam>();
    this.subscriptions.push(ratingInputSelected$.asObservable().subscribe(param => {
      param.responseModels.forEach(responseModel => {
        this.generateRatings(responseModel, param.ratingModel, param.criteria);
      });
    }));

    this.dialog.open(CreateRatingDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {responseModels: this.responseModels, ratingInputSelected$}
    });
  }

  public openGenerateResponsesDialog() {
    let modelSelected$ = new Subject<Model>();
    this.subscriptions.push(modelSelected$.asObservable().subscribe(model => {
      this.generateResponses(model)
    }));

    this.dialog.open(GenerateResponsesDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {responseModels: this.responseModels, modelSelected$}
    });
  }

  private generateResponses(model: Model) {
    this.topic!.prompts.forEach((p, index) => {
      if (!this.responseService.generateResponse(this.topic!, p, model)) {
        return;
      } else if (index == 0) {
        this.responseModels.push(model);
        if (this.displayedColumns.includes('response-tbg')) {
          this.displayedColumns.pop();
        }
        this.displayedColumns = this.displayedColumns.concat(this.getResponseColumnLabel(model));
      }
    });
  }

  private generateRatings(responseModel: Model, ratingModel: Model, criteria: Criteria) {
    this.topic!.prompts.forEach(p => {
      if (p.responses.has(responseModel)) {
        let response = p.responses.get(responseModel);
        if(!this.ratingService.generateRating(this.topic!, response!, ratingModel, criteria)) {
          return;
        }
      }
    });
  }

}
