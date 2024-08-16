import { Injectable } from '@angular/core';
import {GenaiApi} from "../data/genai-api.data";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenUsageService {

  private tokensUsed = new Map<GenaiApi, {inputTokens: number, outputTokens: number}>();
  private tokensChanged$ = new Subject<GenaiApi>();

  constructor() {}

  public logTokenUsage(genai: GenaiApi, inputTokens: number, outputTokens: number) {
    if (this.tokensUsed.has(genai)) {
      let prev = this.tokensUsed.get(genai)!;
      this.tokensUsed.set(genai, {inputTokens: prev.inputTokens + inputTokens, outputTokens: prev.outputTokens + outputTokens});
    } else {
      this.tokensUsed.set(genai, {inputTokens, outputTokens});
    }
    this.tokensChanged$.next(genai);
  }

  public getTopicAddedObservable(): Observable<GenaiApi> { return this.tokensChanged$.asObservable(); }

  public getTokensUsedForGenaiAPI(genai: GenaiApi): {inputTokens: number, outputTokens: number} {
    return this.tokensUsed.get(genai) || {inputTokens: 0, outputTokens: 0};
  }
}
