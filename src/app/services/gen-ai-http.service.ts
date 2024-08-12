import { Injectable } from '@angular/core';
import { KeyService } from './key.service';
import { Model } from '../data/model.data';
import { GeminiResponse } from '../data/gemini-response.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenAiHttpService {

  constructor(private keyService: KeyService,
              private http: HttpClient) { }


  public prompt(model: Model, prompt: string): Observable<JSON> | string {
    if (model.startsWith("gemini")) {
      return this.promptGemini(model, prompt);
    } else if (model.startsWith("gpt")) {
      return this.promptGPT(model, prompt);
    }
    return `'${model}' is not yet supported for prompting!`;
  }

  private promptGemini(model: string, prompt: string): Observable<JSON> | string {
    let key = this.keyService.getGeminiKey();
    if (!key) {
      return "No Gemini API Key was provided! Add it first.";
    }

    let endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    let payload = {
      "contents": [
        {
          "parts": [
            {
              "text": prompt
            },
          ]
        }
      ],
      "generationConfig":  {
        "temperature": 0,
      },
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<JSON>(endpoint, JSON.stringify(payload), httpOptions);
  }

  private promptGPT(model: string, prompt: string): Observable<JSON> | string {
    let key = this.keyService.getGptKey();
    if (!key) {
      return "No ChatGPT API Key was provided! Add it first.";
    }

    let endpoint = "https://api.openai.com/v1/chat/completions";

    let payload = {
      "model": model,
      "messages": [{"role": "user", "content": prompt}],
      "temperature": 0,
      "max_tokens": 1500
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${key}`
      })
    };

    return this.http.post<JSON>(endpoint, JSON.stringify(payload), httpOptions);
  }

  public retrieveResponseAsString(model: Model, response: unknown): string {
    if (model.startsWith("gemini")) {
      return this.retrieveGeminiResponse(response);

    } else if (model.startsWith("gpt")) {
      return JSON.stringify(response); // TODO:
    }
    return `'${model}' is not yet supported!`; // will never reach here.
  }

  private retrieveGeminiResponse(res: unknown): string {
    const response: GeminiResponse = res as GeminiResponse;
    return response.candidates[0].content.parts[0].text;
  }

}
