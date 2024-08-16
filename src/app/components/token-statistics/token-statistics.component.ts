import { Component, OnDestroy, OnInit} from '@angular/core';
import { TokenUsageService } from '../../services/token-usage.service';
import {GenaiApi} from "../../data/genai-api.data";
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-token-statistics',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './token-statistics.component.html',
  styleUrl: './token-statistics.component.css'
})
export class TokenStatisticsComponent implements OnInit, OnDestroy {

  public statistics: TokenStatistics[] = [];
  private subscription: Subscription | undefined;

  constructor(private tokenService: TokenUsageService) {}

  ngOnInit() {
    this.subscription = this.tokenService.getTopicAddedObservable().subscribe(genaiApi => {
      let tokens = this.tokenService.getTokensUsedForGenaiAPI(genaiApi);
      let stats = this.statistics.find(s => s.genaiApi == genaiApi);
      if (stats) {
        stats.inputTokens = tokens.inputTokens;
        stats.outputTokens = tokens.outputTokens;
      } else {
        this.statistics.push({genaiApi, inputTokens: tokens.inputTokens, outputTokens: tokens.outputTokens});
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

interface TokenStatistics {
  genaiApi: GenaiApi,
  inputTokens: number;
  outputTokens: number;
}
