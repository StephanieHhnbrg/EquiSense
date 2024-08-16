import {Injectable} from '@angular/core';
import {KeyService} from './key.service';
import {Model} from '../data/model.data';
import {GeminiResponse} from '../data/gemini-response.data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenUsageService} from './token-usage.service';
import {GenaiApi} from "../data/genai-api.data";
import { GptResponse } from '../data/gpt-response.data';

@Injectable({
  providedIn: 'root'
})
export class GenAiHttpService {

  constructor(private keyService: KeyService,
              private tokenUsageService: TokenUsageService,
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
      const geminiResponse: GeminiResponse = response as GeminiResponse;
      this.tokenUsageService.logTokenUsage(GenaiApi.Gemini, geminiResponse.usageMetadata.promptTokenCount, geminiResponse.usageMetadata.candidatesTokenCount);
      return geminiResponse.candidates[0].content.parts[0].text;
    } else if (model.startsWith("gpt")) {
      const gptResponse: GptResponse = response as GptResponse;
      this.tokenUsageService.logTokenUsage(GenaiApi.ChatGPT, gptResponse.usage.prompt_tokens, gptResponse.usage.completion_tokens);
      return gptResponse.choices[0].message.content;
    }
    return `'${model}' is not yet supported!`; // will never reach here.
  }


}
