import { Component, OnDestroy, OnInit } from '@angular/core';
import {TopicPanelComponent} from "../topic-panel/topic-panel.component";
import { Topic } from '../../data/topic.data';
import { TopicService } from '../../services/topic.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import { MatIconModule } from '@angular/material/icon';
import {AlertPanelComponent} from "../alert-panel/alert-panel.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, TopicPanelComponent, AlertPanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  public topics: Topic[] = [];
  private addTopicAddedSubscription: Subscription | undefined;

  constructor(private topicService: TopicService) {
  }

  ngOnInit() {
    this.topics = this.topicService.getTopics();
    this.addTopicAddedSubscription = this.topicService.getTopicAddedObservable().subscribe(() => {
      this.topics = this.topicService.getTopics();
    })
  }

  ngOnDestroy() {
    if(this.addTopicAddedSubscription) {
      this.addTopicAddedSubscription.unsubscribe();
    }
  }
}
