import { Injectable } from '@angular/core';
import {Topic} from "../data/topic.data";
import { Prompt } from '../data/prompt.data';
import {GenAiHttpService} from "./gen-ai-http.service";
import { Model } from '../data/model.data';
import {Observable} from "rxjs";
import { AlertingService } from './alerting.service';
import { KeyService } from './key.service';
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private genAiHttpService: GenAiHttpService,
              private alertingService: AlertingService,
              private loadingService: LoadingService,
              private keyService: KeyService) { }

  public generateResponse(topic: Topic, prompt: Prompt, model: Model): boolean {
    if (prompt.responses.has(model)) {
      this.alertingService.addAlert(`The prompts already have responses generated by the model '${model}'`);
      return false;
    }
    this.loadingService.loadResponseGeneration(topic);
    let data = this.genAiHttpService.prompt(model, prompt.request);
    if (data instanceof Observable) {
      data.subscribe({
        next: (d) => {
          let response = this.genAiHttpService.retrieveResponseAsString(model, d);
          prompt.responses.set(model, {response, ratings: [], generatedBy: model});
        },
        complete: () => { console.log("response complete"); this.loadingService.responseGenerationCompleted(topic); },
        error: (error) => {
          if (error.status == 401 || error.error.error.code == 400) {
            this.loadingService.responseGenerationCompleted(topic);
            this.alertingService.addAlert(`Your provided API Key for ${model} was invalid and was removed. Please provide a valid one.`);
            this.keyService.removeKey(model);
          } else {
            this.alertingService.addAlert(`The API threw the following error ${error.message}`);
          }
          return false;
        }
      });
      return true;
    } else {
      this.loadingService.responseGenerationCompleted(topic);
      this.alertingService.addAlert(data);
      return false;
    }
  }
}
