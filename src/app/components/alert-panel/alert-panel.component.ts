import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import { AlertingService } from '../../services/alerting.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './alert-panel.component.html',
  styleUrl: './alert-panel.component.css'
})
export class AlertPanelComponent implements OnInit, OnDestroy {

  public alerts: string[] = [];
  private alertSubscription: Subscription | undefined;

  constructor(private alertingService: AlertingService) {}

  public ngOnInit() {
    this.alertSubscription = this.alertingService.getAlertAddedObservable().subscribe(alert => {
        if (this.alerts.find(a => a == alert) == undefined) {
          this.alerts.push(alert)
        }
      }
    );
  }

  ngOnDestroy() {
    if(this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  public removeAlert(alert: string) {
    this.alerts = this.alerts.filter(a => a != alert);
  }

}
