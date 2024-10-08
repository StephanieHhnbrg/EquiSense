import { Injectable } from '@angular/core';
import { Topic } from '../data/topic.data';
import {Observable, Subject } from 'rxjs';
import {Model} from "../data/model.data";
import {Response} from "../data/response.data";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topics: Topic[] = [];
  private topicAdded$ = new Subject<number>();


  constructor() { }

  public addTopicName(name: string) {
    if (this.topics.find(t => t.name == name) != undefined) {
      return;
    }

    this.topics.push({name, prompts: []});
    this.topicAdded$.next(this.topics.length);

  }

  public addTopic(topic: Topic) {
    this.topics.push(topic);
    this.topicAdded$.next(this.topics.length);
  }

  public getTopicAddedObservable(): Observable<number> { return this.topicAdded$.asObservable(); }

  public getTopics(): Topic[] {
    return this.topics;
  }
}
