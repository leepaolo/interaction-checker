import { Injectable, signal } from '@angular/core';
import { WritableSignal } from '@angular/core';
import { IClickCounts } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private clickCounts: IClickCounts = {
    about: signal(0),
    news: signal(0),
    contact: signal(0),
    dashboard: signal(0),
  };

  incrementClickCount(buttonName: keyof IClickCounts): void {
    // Check if the provided buttonName is a valid property of clickCounts
    if (this.clickCounts.hasOwnProperty(buttonName)) {
      this.clickCounts[buttonName].update((count) => count + 1);
    } else {
      console.error(`No such property as ${buttonName} in clickCounts`);
    }
  }

  getClickCount(buttonName: keyof IClickCounts): number {
    return this.clickCounts[buttonName]();
  }

  getClickCountsSignal(buttonName: keyof IClickCounts): WritableSignal<number> {
    return this.clickCounts[buttonName];
  }
  constructor() {}
}
