import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { TrackNavbarService } from '../services/track-navbar.service';
import { IClickCounts, IClickFormCounts } from '../models/dashboard';
import { TrackFormService } from '../services/track-form.service';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
      <p>Form sent: {{ btnFormClicks.buttonSend() }}</p>
      <p>Form reset: {{ btnFormClicks.buttonReset() }}</p>
    </div>
    <h2 class="text-2xl">Inline Chart</h2>
    <div class="chart-container" style="height:40vh; width:80vw">
      <canvas id="clicksChart"></canvas>
    </div>
    <h2 class="text-2xl">DoughnutChart Chart</h2>
    <div class="chart-container" style="height:40vh; width:40vw">
      <canvas id="doughnutChart"></canvas>
    </div>
  `,
})
export default class DashboardComponent implements OnInit {
  private trackNavbarService = inject(TrackNavbarService);
  private trackFormService = inject(TrackFormService);

  navClicks: IClickCounts = {
    about: signal(0),
    news: signal(0),
    contact: signal(0),
    dashboard: signal(0),
  };

  btnFormClicks: IClickFormCounts = {
    buttonSend: signal(0),
    buttonReset: signal(0),
  };

  ngOnInit(): void {
    this.loadFormClicks();
    this.loadNavClicks();
  }

  // In your DashboardComponent class
  ngAfterViewInit(): void {
    this.initChart();
    this.initDoughnutChart();
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
      this.navClicks[key] = this.trackNavbarService.getClickCounts(key);
    });
  }
  // CONTACT FORM
  loadFormClicks(): void {
    const btnKeys: (keyof IClickFormCounts)[] = ['buttonSend', 'buttonReset'];

    btnKeys.forEach((key) => {
      this.btnFormClicks[key] = this.trackFormService.getCountClicks(key);
    });
  }

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
                this.navClicks.news(),
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

  initDoughnutChart(): void {
    const ctx = (
      document.getElementById('doughnutChart') as HTMLCanvasElement
    ).getContext('2d');

    if (ctx) {
      const doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Form Sent', 'Form Reset'],
          datasets: [
            {
              label: 'Form Clicks',
              data: [
                this.btnFormClicks.buttonSend(),
                this.btnFormClicks.buttonReset(),
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else {
      console.error('Failed to get canvas context for doughnut chart');
    }
  }
}
