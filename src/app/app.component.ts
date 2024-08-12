import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, ToolbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EquiSense';
}
