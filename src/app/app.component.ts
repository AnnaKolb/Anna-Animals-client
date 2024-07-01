import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiServiceService } from './api-service.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: any;
  constructor(private router: Router, private api: ApiServiceService) {}

  isTabActive(path: string): boolean {
    return this.router.url === path;
  }
}
