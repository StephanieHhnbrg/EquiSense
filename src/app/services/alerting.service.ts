import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertingService {

  private alertAdded$ = new Subject<string>();

  constructor() { }

  addAlert(alert: string) {
    this.alertAdded$.next(alert);
  }

  public getAlertAddedObservable(): Observable<string> { return this.alertAdded$.asObservable(); }

}
