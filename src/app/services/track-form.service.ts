import { Injectable, WritableSignal, signal } from '@angular/core';
import { IClickFormCounts } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class TrackFormService {
  private clickCounts: IClickFormCounts = {
    buttonSend: signal(0),
    buttonReset: signal(0),
  };

  // INCREMENT BUTTON LOGIC
  incClickCount(btn: keyof IClickFormCounts): void {
    if (this.clickCounts.hasOwnProperty(btn)) {
      this.clickCounts[btn].update((count) => count + 1);
    } else {
      console.error(`No such property as ${btn} in clickCounts`);
    }
  }

  // GET COUNT BUTTON LOGIC
  getCountClicks(btn: keyof IClickFormCounts): WritableSignal<number> {
    return this.clickCounts[btn];
  }

  // RESET BUTTON LOGIC
  resClickCount(btn: keyof IClickFormCounts): void {
    if (this.clickCounts.hasOwnProperty(btn)) {
      this.clickCounts[btn].update((count) => count + 1);
      console.log(this.clickCounts[btn]());
    } else {
      console.error(`No such property as ${btn} to reset in clickCounts`);
    }
  }

  constructor() {}
}
