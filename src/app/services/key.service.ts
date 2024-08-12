import { Injectable } from '@angular/core';
import {GenaiApi} from "../data/genai-api.data";
import { Model } from '../data/model.data';
import { AlertingService } from './alerting.service';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private geminiKey: string | undefined
  private gptKey: string | undefined

  constructor(private alertingService: AlertingService) { }

  getGeminiKey(): string | undefined {
    return this.geminiKey;
  }

  getGptKey(): string | undefined {
    return this.gptKey;
  }

  public addKey(api: GenaiApi, key: string) {
    switch (api) {
      case GenaiApi.Gemini: this.setGeminiApiKey(key); break;
      case GenaiApi.ChatGPT: this.setGptApiKey(key); break;
    }
  }

  public hasKey(api: GenaiApi): boolean {
    switch (api) {
      case GenaiApi.Gemini: return this.geminiKey != undefined;
      case GenaiApi.ChatGPT: return this.gptKey != undefined;
    }
  }

  public removeKey(model: Model) {
    if (model.startsWith("gemini")) {
      this.geminiKey = undefined;
    } else if (model.startsWith("gpt")) {
      this.gptKey = undefined;
    }
  }

  private setGeminiApiKey(key: string) {
    this.geminiKey = key;
  }

  private setGptApiKey(key: string) {
    if (key.startsWith("sk-proj-") && key.length > 50) {
      this.gptKey = key;
    } else {
      this.alertingService.addAlert("The inserted GPT API Key is invalid.")
    }
  }

}
