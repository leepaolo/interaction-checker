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
    // Directly link signals from service to component's signals
    this.clickCounts.about =
      this.dashboardService.getClickCountsSignal('about');
    this.clickCounts.news = this.dashboardService.getClickCountsSignal('news');
    this.clickCounts.contact =
      this.dashboardService.getClickCountsSignal('contact');
    this.clickCounts.dashboard =
      this.dashboardService.getClickCountsSignal('dashboard');
  }
}
