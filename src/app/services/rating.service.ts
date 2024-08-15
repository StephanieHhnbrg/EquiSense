import { Injectable } from '@angular/core';
import {GenAiHttpService} from "./gen-ai-http.service";
import {Response} from "../data/response.data";
import {Model} from "../data/model.data";
import {Criteria} from "../data/criteria.data";
import {Observable} from "rxjs";
import { AlertingService } from './alerting.service';
import { KeyService } from './key.service';
import {LoadingService} from "./loading.service";
import {Topic } from '../data/topic.data';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private genAiHttpService: GenAiHttpService,
              private alertingService: AlertingService,
              private loadingService: LoadingService,
              private keyService: KeyService) {}

  public generateRating(topic: Topic, response: Response, model: Model, criteria: Criteria, customPrompt?: string): boolean {
    if (response.ratings.find(r => r.criteria.name == criteria.name && r.ratedBy == model) != undefined) {
      this.alertingService.addAlert(`Responses were already rated by the criteria '${criteria.name}' with the '${model}'.`);
      return false;
    }

    let prompt = customPrompt ? this.replacePromptPlaceholders(customPrompt, criteria, response) : this.getPrompt(criteria, response);

    this.loadingService.loadRatingGeneration(topic);
    let data = this.genAiHttpService.prompt(model, prompt);
    if (data instanceof Observable) {
      data.subscribe({
        next: (d) => {
          let res = this.genAiHttpService.retrieveResponseAsString(model, d);
          let explanation = res.split("explanation\":")[1].split("}")[0].trim();
          let rating: number = +res.split("score\":")[1].split(",")[0]
          response.ratings.push({rating, explanation, criteria, ratedBy: model});
        },
        complete: () => { console.log("ratings complete"); this.loadingService.ratingGenerationCompleted(topic);},
        error: (error) => {
          this.loadingService.ratingGenerationCompleted(topic);
          if (error.status == 401 || error.error.error.code == 400) {
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
      this.loadingService.ratingGenerationCompleted(topic);
      this.alertingService.addAlert(data);
      return false;
    }
  }

  public getPrompt(criteria?: Criteria, response?: Response): string {
    let responseStr = response ? response.response : '<Response>';
    let criteriaName = criteria ? criteria.name : '<Criteria>';
    let criteriaDesc = criteria ? criteria.desc : '<Desc of Criteria>';

    return "You are examining written text content. Here is the text:\n" +
      "[BEGIN DATA]\n" +
      "************\n" +
      `[Text]: ${responseStr}\n` +
      "************\n" +
      "[END DATA]\n" +
      "\n" +
      `Examine the text and judge it on the criteria: ${criteriaName}.\n` +
      `${criteriaDesc} \n` +
      "\n" +
      `Your response must include a score, which must be a single integer number on a scale of 0-5, 0 for the least fitting the criteria ${criteriaName} and 5 being for the most fitting the criteria ${criteriaName}.` +
      "Output a json object that contains the following keys: score, explanation.";
  }

  private replacePromptPlaceholders(customPrompt: string, criteria: Criteria, response: Response): string {
    return customPrompt.replace('<Response>', response.response)
                      .replace('<Criteria>', criteria.name)
                      .replace('<Desc of Criteria>', criteria.desc);
  }

}
