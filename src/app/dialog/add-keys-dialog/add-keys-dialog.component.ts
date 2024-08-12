import {ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {GenaiApi, getGenaiApiByString} from '../../data/genai-api.data';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { CommonModule } from '@angular/common';
import { KeyService } from '../../services/key.service';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-add-keys-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-keys-dialog.component.html',
  styleUrl: './add-keys-dialog.component.css'
})
export class AddKeysDialogComponent {
  public genaiApis = Object.keys(GenaiApi);

  constructor(private keyService: KeyService) {}

  public addApiKey(api: GenaiApi, key: string) {
    this.keyService.addKey(api, key);
  }

  public hasValidKey(api: string): boolean {
    let apiEnum = getGenaiApiByString(api);
    if (apiEnum) {
      return this.keyService.hasKey(apiEnum);
    }
    return false;
  }

}
