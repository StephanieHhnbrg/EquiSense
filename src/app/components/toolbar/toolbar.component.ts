import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {AddTopicDialogComponent} from "../../dialog/add-topic-dialog/add-topic-dialog.component";
import { GeneratePromptsDialogComponent } from '../../dialog/generate-prompts-dialog/generate-prompts-dialog.component';
import { AddKeysDialogComponent } from '../../dialog/add-keys-dialog/add-keys-dialog.component';
import { CommonModule } from '@angular/common';
import { LoadingIconComponent } from '../loading-icon/loading-icon.component';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, LoadingIconComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit, OnDestroy {


  private readonly dialog = inject(MatDialog);
  public isPromptingLoading = false;
  private loadingSubscription: Subscription | undefined;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingService.getPromptingLoadingObservable().subscribe(value => {
      this.isPromptingLoading = value;
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  openAddTopicDialog(): void {
    this.dialog.open(AddTopicDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms'
    });
  }

  openGeneratePromptsDialog(): void {
    this.dialog.open(GeneratePromptsDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms'
    });
  }

  openAddKeysDialog(): void {
    this.dialog.open(AddKeysDialogComponent, {
      width: '450px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms'
    });
  }

}
