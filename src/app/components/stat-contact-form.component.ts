import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { IClickFormCounts } from '../models/dashboard';
import { TrackFormService } from '../services/track-form.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-stat-contact-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-orange-300">FORM BTN CLICKS</p>
    <div>
      <p>Form sent: {{ btnFormClicks.buttonSend() }}</p>
      <p>Form reset: {{ btnFormClicks.buttonReset() }}</p>
    </div>
    <h2 class="text-2xl">DoughnutChart Chart</h2>
    <div class="chart-container" style="height:40vh; width:40vw">
      <canvas id="doughnutChart"></canvas>
    </div>
  `,
})
export class StatContactFormComponent {
  private trackFormService = inject(TrackFormService);

  btnFormClicks: IClickFormCounts = {
    buttonSend: signal(0),
    buttonReset: signal(0),
  };

  ngOnInit(): void {
    this.loadFormClicks();
  }

  // In your DashboardComponent class
  ngAfterViewInit(): void {
    this.initDoughnutChart();
  }

  // CONTACT FORM BUTTONS CLICKS
  loadFormClicks(): void {
    const btnKeys: (keyof IClickFormCounts)[] = ['buttonSend', 'buttonReset'];

    btnKeys.forEach((key) => {
      this.btnFormClicks[key] = this.trackFormService.getCountClicks(key);
    });
  }

  // DOUGHNUT CHART.JS D
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
