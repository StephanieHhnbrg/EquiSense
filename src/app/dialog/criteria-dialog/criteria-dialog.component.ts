import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { CriteriaService } from '../../services/criteria.service';
import { Criteria } from '../../data/criteria.data';

@Component({
  selector: 'app-criteria-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './criteria-dialog.component.html',
  styleUrl: './criteria-dialog.component.css'
})
export class CriteriaDialogComponent implements OnInit {

  public criteria: Criteria[] = [];
  addingCriteria = false;

  constructor(private criteriaService: CriteriaService) {}

  public ngOnInit() {
    this.criteria = this.criteriaService.getCriteria();
  }

  public addCriteria(name: string, desc: string) {
    this.criteriaService.addCriteria(name, desc);
    this.addingCriteria = false;
    // TODO: clear input fields!
  }

}
