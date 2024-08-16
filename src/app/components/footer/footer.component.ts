import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ExportService } from '../../services/export.service';
import { ImportService } from '../../services/import.service';
import { AlertingService } from '../../services/alerting.service';
import {TokenStatisticsComponent} from "../token-statistics/token-statistics.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, TokenStatisticsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private exportService: ExportService,
              private importService: ImportService,
              private alertingService: AlertingService) {
  }

  public downloadData() {
    this.exportService.generateExcel();
  }

  public async uploadData(event: any) {
    const file: File = event.target.files[0];
    if (!file || file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.alertingService.addAlert("Please provide a file in xlsx format.");
      return;
    } else {
      this.importService.importExcel(file);
    }
  }
}
