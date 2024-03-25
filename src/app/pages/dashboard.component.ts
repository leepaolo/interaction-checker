import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { DashboardService } from '../services/track-navbar.service';
import { IClickCounts, IClickFormCounts } from '../models/dashboard';
import { TrackFormService } from '../services/track-form.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dashboard works!</p>
    <div>
      <p>About Page Clicks: {{ navClicks.about() }}</p>
      <p>Work Page Clicks: {{ navClicks.news() }}</p>
      <p>Contact Page Clicks: {{ navClicks.contact() }}</p>
      <p>Dashboard Page Clicks: {{ navClicks.dashboard() }}</p>
    </div>
    <br />
    <div>
      <p>Form sent: {{ btnSentClicks.buttonSend() }}</p>
    </div>
  `,
})
export default class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private trackFormService = inject(TrackFormService);

  navClicks: IClickCounts = {
    about: signal(0),
    news: signal(0),
    contact: signal(0),
    dashboard: signal(0),
  };

  btnSentClicks: IClickFormCounts = {
    buttonSend: signal(0),
  };

  ngOnInit(): void {
    this.loadFormClicks();
    this.loadNavClicks();
  }
  // NAVBAR
  loadNavClicks(): void {
    // ClickCounts' and the service return the same keys ('about', 'news', 'contact', 'dashboard')
    const keys: (keyof IClickCounts)[] = [
      'about',
      'news',
      'contact',
      'dashboard',
    ];

    keys.forEach((key) => {
      this.navClicks[key] = this.dashboardService.getClickCountsSignal(key);
    });
  }
  // CONTACT FORM
  loadFormClicks(): void {
    this.btnSentClicks.buttonSend.update(() =>
      this.trackFormService.getCountClicks('buttonSend')
    );
  }
}
