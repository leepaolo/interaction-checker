import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { IClickCounts } from '../models/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dashboard works!</p>
    <div>
      <p>About Page Clicks: {{ clickCounts.about() }}</p>
      <p>Work Page Clicks: {{ clickCounts.news() }}</p>
      <p>Contact Page Clicks: {{ clickCounts.contact() }}</p>
      <p>Dashboard Page Clicks: {{ clickCounts.dashboard() }}</p>
    </div>
  `,
})
export default class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  clickCounts: IClickCounts = {
    about: signal(0),
    news: signal(0),
    contact: signal(0),
    dashboard: signal(0),
  };

  ngOnInit(): void {
    this.loadClickCount();
  }

  loadClickCount(): void {
    // Assuming 'clickCounts' and the service return the same keys ('about', 'news', 'contact', 'dashboard')
    const keys: (keyof IClickCounts)[] = [
      'about',
      'news',
      'contact',
      'dashboard',
    ];

    keys.forEach((key) => {
      this.clickCounts[key] = this.dashboardService.getClickCountsSignal(key);
    });
  }
}
