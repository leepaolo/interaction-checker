import { Component, inject, signal } from '@angular/core';
import { TrackNavbarService } from '../services/track-navbar.service';
import { IClickCounts } from '../models/dashboard';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-stat-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-orange-300">NAVBAR CLICKS</p>
    <div>
      <p>About Page Clicks: {{ navClicks.about() }}</p>
      <p>Work Page Clicks: {{ navClicks.work() }}</p>
      <p>Contact Page Clicks: {{ navClicks.contact() }}</p>
      <p>Dashboard Page Clicks: {{ navClicks.dashboard() }}</p>
    </div>
    <h2 class="text-2xl">Inline Chart</h2>
    <div class="chart-container" style="height:40vh; width:80vw">
      <canvas id="clicksChart"></canvas>
    </div>
  `,
})
export class StatNavbarComponent {
  private trackNavbarService = inject(TrackNavbarService);

  navClicks: IClickCounts = {
    about: signal(0),
    work: signal(0),
    contact: signal(0),
    dashboard: signal(0),
  };

  ngOnInit(): void {
    this.loadNavClicks();
  }

  // In your DashboardComponent class
  ngAfterViewInit(): void {
    this.initChart();
  }

  // NAVBAR CLICKS
  loadNavClicks(): void {
    const keys: (keyof IClickCounts)[] = [
      'about',
      'work',
      'contact',
      'dashboard',
    ];

    keys.forEach((key) => {
      this.navClicks[key] = this.trackNavbarService.getClickCounts(key);
    });
  }

  // INLINE CHART.JS
  initChart(): void {
    const ctx = (
      document.getElementById('clicksChart') as HTMLCanvasElement
    ).getContext('2d');

    if (ctx !== null) {
      const clicksChart = new Chart(ctx, {
        type: 'bar', // or 'line' for a line chart
        data: {
          labels: ['About', 'Work', 'Contact', 'Dashboard'], // Adjust as needed
          datasets: [
            {
              label: 'Navbar Clicks',
              data: [
                this.navClicks.about(),
                this.navClicks.work(),
                this.navClicks.contact(),
                this.navClicks.dashboard(),
              ],

              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              // Define a border color fo'
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
