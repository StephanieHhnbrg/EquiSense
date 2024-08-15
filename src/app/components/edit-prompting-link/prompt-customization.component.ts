import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-prompt-customization',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './prompt-customization.component.html',
  styleUrl: './prompt-customization.component.css'
})
export class PromptCustomizationComponent {

  @Output() updatedPrompt = new EventEmitter<string>();


  @Input({ required: true }) public defaultPrompt: string = "";
  editingPrompt = false;

  onChange(prompt: string) {
    this.updatedPrompt.emit(prompt);
  }

}
