import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Topic } from '../data/topic.data';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingResponses = new Map<string, number>;
  private loadingRatings = new Map<string, number>;

  private isPromptGenerationLoading$ = new Subject<boolean>();
  private areRatingsLoading$ = new Subject<{topic: string, loading: number}>();
  private areResponsesLoading$ = new Subject<{topic: string, loading: number}>();

  constructor() { }

  public loadPromptGeneration() {
    this.isPromptGenerationLoading$.next(true);
  }

  public loadRatingGeneration(topic: Topic) {
    if (this.loadingRatings.has(topic.name)) {
      let loadings = this.loadingRatings.get(topic.name);
      this.loadingRatings.set(topic.name, loadings!+1);
      this.areRatingsLoading$.next({topic: topic.name, loading: loadings!+1});
    } else {
      this.loadingRatings.set(topic.name, 1);
      this.areRatingsLoading$.next({topic: topic.name, loading: 1});
    }
  }

  public loadResponseGeneration(topic: Topic) {
    if (this.loadingResponses.has(topic.name)) {
      let loadings = this.loadingResponses.get(topic.name);
      this.loadingResponses.set(topic.name, loadings!+1);
      this.areResponsesLoading$.next({topic: topic.name, loading: loadings!+1});
    } else {
      this.loadingResponses.set(topic.name, 1);
      this.areResponsesLoading$.next({topic: topic.name, loading: 1});
    }
  }

  public promptGenerationCompleted() {
    this.isPromptGenerationLoading$.next(false);
  }

  public ratingGenerationCompleted(topic: Topic) {
    if (this.loadingRatings.has(topic.name)) {
      let loadings = this.loadingRatings.get(topic.name);
      this.loadingRatings.set(topic.name, loadings!-1);
      this.areRatingsLoading$.next({topic: topic.name, loading: loadings!-1});
    }  }

  public responseGenerationCompleted(topic: Topic) {
    if (this.loadingResponses.has(topic.name)) {
      let loadings = this.loadingResponses.get(topic.name);
      this.loadingResponses.set(topic.name, loadings!-1);
      this.areResponsesLoading$.next({topic: topic.name, loading: loadings!-1});
    }
  }

  public getPromptingLoadingObservable(): Observable<boolean> { return this.isPromptGenerationLoading$.asObservable(); }
  public getRatingsLoadingObservable(): Observable<{topic: string, loading: number}> { return this.areRatingsLoading$.asObservable(); }
  public getResponsesLoadingObservable(): Observable<{topic: string, loading: number}> { return this.areResponsesLoading$.asObservable(); }

}
