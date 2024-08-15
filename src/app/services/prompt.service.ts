import { Injectable } from '@angular/core';
import { Topic } from '../data/topic.data';
import { Model } from '../data/model.data';
import { GenAiHttpService } from './gen-ai-http.service';
import {Response} from "../data/response.data";
import { Observable } from 'rxjs';
import { AlertingService } from './alerting.service';
import { KeyService } from './key.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor(private genAiHttpService: GenAiHttpService,
              private alertingService: AlertingService,
              private loadingService: LoadingService,
              private keyService: KeyService) {}

  public generatePrompts(topic: Topic, model: Model, customPrompt?: string) {
    let prompt = customPrompt ? customPrompt.replace('<Topic>', topic.name) : this.getPrompt(topic);
    console.log(prompt);
    this.loadingService.loadPromptGeneration();
    let data = this.genAiHttpService.prompt(model, prompt);
    if (data instanceof Observable) {
      data.subscribe({
        next: (d) => {
          let response = this.genAiHttpService.retrieveResponseAsString(model, d);
          let generatedPrompts = response.replace("\n","").split("*").map(entry => entry.trim()).filter(entry => entry.length > 1).slice(1);
          generatedPrompts.forEach(p => {
            topic.prompts.push({request: p, generatedBy: model, responses: new Map<Model, Response>()});
          })
        },
        complete: () => { console.log("prompts complete"); this.loadingService.promptGenerationCompleted(); },
        error: (error) => {
          this.loadingService.promptGenerationCompleted();
          if (error.status == 401 || error.error.error.code == 400) {
            this.alertingService.addAlert(`Your provided API Key for ${model} was invalid and was removed. Please provide a valid one.`);
            this.keyService.removeKey(model);
          } else {
            this.alertingService.addAlert(`The API threw the following error ${error.message}`);
          }
        }
      });
    } else {
      this.loadingService.promptGenerationCompleted();
      this.alertingService.addAlert(data);
    }
  }

  public getPrompt(topic: Topic | undefined): string {
    let value = topic ? topic.name : '<Topic>'
    return `You are an expert in the topic ${value} and you are invited to a conference. `
    + `To be prepared on potential questions, make a list of questions the audience, consisting of a wide range of people from different background and expertise, could ask you. `
    + `Answer by only providing a bullet point list of minimum 20 questions.`;
  }
}
