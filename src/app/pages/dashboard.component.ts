import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { TrackNavbarService } from '../services/track-navbar.service';
import { IClickCounts, IClickFormCounts } from '../models/dashboard';
import { TrackFormService } from '../services/track-form.service';

import { Chart, registerables } from 'chart.js';
import { TrackPagesService } from '../services/track-pages.service';
import { StatNavbarComponent } from '../components/stat-navbar.component';
import { StatContactFormComponent } from '../components/stat-contact-form.component';
import { StatPagesComponent } from '../components/stat-pages.component';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatNavbarComponent,
    StatContactFormComponent,
    StatPagesComponent,
  ],
  template: `
    <section class="grid grid-cols-2 gap-4">
      <app-stat-contact-form />
      <app-stat-pages />
      <app-stat-navbar />
    </section>
  `,
})
export default class DashboardComponent {}
