import { Component, Inject, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import { Model } from '../../data/model.data';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-generate-responses-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule],
  templateUrl: './generate-responses-dialog.component.html',
  styleUrl: './generate-responses-dialog.component.css'
})
export class GenerateResponsesDialogComponent implements OnInit {

  public modelOptions: Model[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { responseModels: Model[], modelSelected$: Subject<Model> }) {}

  public ngOnInit() {
    this.modelOptions = Object.values(Model).filter(m1 => this.data.responseModels.find(m2 => m1 == m2) == undefined);
  }

  public selectResponseModel(model: Model) {
    this.data.modelSelected$.next(model);
  }
}
