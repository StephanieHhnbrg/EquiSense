import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {FormControl, FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../data/topic.data';
import { MatSelectModule } from '@angular/material/select';
import {getModelByString, Model} from '../../data/model.data';
import { Response } from '../../data/response.data';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {PromptService} from "../../services/prompt.service";



@Component({
  selector: 'app-generate-prompts-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatTabsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generate-prompts-dialog.component.html',
  styleUrl: './generate-prompts-dialog.component.css'
})
export class GeneratePromptsDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<GeneratePromptsDialogComponent>);
  public topics: Topic[] = [];
  public models = Object.values(Model);
  tabSelected = new FormControl(0);


  constructor(private topicService: TopicService,
              private promptService: PromptService) {}

  ngOnInit() {
    this.topics = this.topicService.getTopics();
  }

  public generatePrompts(topic: Topic, modelLabel: string) {
    let model = getModelByString(modelLabel);
    if (model) {
      this.promptService.generatePrompts(topic, model);
    }
  }

  public addPrompts(topic: Topic, promptsStr: string) {
    let prompts = promptsStr.split("\n");
    prompts.forEach(p => {
      topic.prompts.push({request:p, generatedBy: "by_user", responses: new Map<Model, Response>()});
    })
  }

}
