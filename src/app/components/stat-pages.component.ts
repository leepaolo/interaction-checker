import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TrackPagesService } from '../services/track-pages.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-stat-pages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <p class="text-orange-300">TOTAL PAGES VIEWED</p>
      <div>
        <p>Pages Viewed: {{ TrackPagesService.totalPageViewed() }}</p>
      </div>
      <div>
        <p>About Page Viewed: {{ aboutPageViewCount() }}</p>
        <p>Work Page Viewed: {{ workPageViewCount() }}</p>
        <p>Contact Page Viewed: {{ contactPageViewCount() }}</p>
        <p>Dashboard Page Viewed: {{ dashboardPageViewCount() }}</p>
      </div>
      <div class="chart-container" style="height:40vh; width:40vw">
        <canvas id="pagesDoughnutChart"></canvas>
      </div>
    </div>
  `,
})
export class StatPagesComponent {
  public TrackPagesService = inject(TrackPagesService);

  // TOTAL PAGES VIEWED
  pageViewCount(): number {
    return this.TrackPagesService.totalPageViewed();
  }

  aboutPageViewCount(): number {
    return this.TrackPagesService.configPagesViews().aboutPage;
  }

  workPageViewCount(): number {
    return this.TrackPagesService.configPagesViews().workPage;
  }

  contactPageViewCount(): number {
    return this.TrackPagesService.configPagesViews().contactPage;
  }

  dashboardPageViewCount(): number {
    return this.TrackPagesService.configPagesViews().dashboardPage;
  }

  ngAfterViewInit(): void {
    this.initDoughnutChart();
  }

  initDoughnutChart(): void {
    const ctx = (
      document.getElementById('pagesDoughnutChart') as HTMLCanvasElement
    )?.getContext('2d');

    if (ctx) {
      const doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['About', 'Work', 'Contact', 'Dashboard'],
          datasets: [
            {
              data: [
                this.aboutPageViewCount(),
                this.workPageViewCount(),
                this.contactPageViewCount(),
                this.dashboardPageViewCount(),
              ],
              backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
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
      console.error('Failed to get canvas context for pages doughnut chart');
    }
  }
}
