import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {Topic } from '../../data/topic.data';
import {PromptTableComponent} from "../prompt-table/prompt-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-panel',
  standalone: true,
  imports: [ CommonModule, MatExpansionModule, PromptTableComponent],
  templateUrl: './topic-panel.component.html',
  styleUrl: './topic-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TopicPanelComponent {

  readonly panelOpenState = signal(true);
  @Input({ required: true }) public topic: Topic | undefined;

}
