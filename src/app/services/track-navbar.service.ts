import { Injectable, signal } from '@angular/core';
import { WritableSignal } from '@angular/core';
import { IClickCounts } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class TrackNavbarService {
  private clickCounts: IClickCounts = {
    about: signal(0),
    work: signal(0),
    contact: signal(0),
    dashboard: signal(0),
  };

  incClickCount(btn: keyof IClickCounts): void {
    // Check if the provided buttonName is a valid property of clickCounts
    if (this.clickCounts.hasOwnProperty(btn)) {
      this.clickCounts[btn].update((count) => count + 1);
    } else {
      console.error(`No such property as ${btn} in clickCounts`);
    }
  }

  getClickCounts(btn: keyof IClickCounts): WritableSignal<number> {
    return this.clickCounts[btn];
  }
  constructor() {}
}
