import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-add-topic-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-topic-dialog.component.html',
  styleUrl: './add-topic-dialog.component.css'
})
export class AddTopicDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddTopicDialogComponent>);

  constructor(private topicService: TopicService) {
  }

  public addTopic(name: string) {
    this.topicService.addTopic(name);
  }
}
