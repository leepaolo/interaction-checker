import { Injectable, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackPagesService {
  totalPageViewed: WritableSignal<number> = signal(0);

  incrementPageView(): void {
    this.totalPageViewed.update((count) => count + 1);
  }

  statePageViews = computed(() => this.totalPageViewed());

  configPagesViews = signal({
    aboutPage: 0,
    workPage: 0,
    contactPage: 0,
    dashboardPage: 0,
  });

  stateAboutPage = computed(() => this.configPagesViews().aboutPage);
  stateWorkPage = computed(() => this.configPagesViews().workPage);

  setIncAboutPage(): void {
    this.configPagesViews.update((cfg) => ({
      ...cfg,
      aboutPage: cfg.aboutPage + 1,
    }));
  }

  setIncWorkPage(): void {
    this.configPagesViews.update((cfg) => ({
      ...cfg,
      workPage: cfg.workPage + 1,
    }));
  }

  setIncContactPage(): void {
    this.configPagesViews.update((cfg) => ({
      ...cfg,
      contactPage: cfg.contactPage + 1,
    }));
  }

  setIncDashboardPage(): void {
    this.configPagesViews.update((cfg) => ({
      ...cfg,
      dashboardPage: cfg.dashboardPage + 1,
    }));
  }

  constructor() {}
}

// this.configPagesViews.update((cfg) => ({
//   ...cfg,
//   about: cfg.aboutPage + 1,
// }));

// this.configPagesViews.update((cfg) => ({
//   ...cfg,
//   work: cfg.workPage + 1,
// }));
