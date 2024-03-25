import { Injectable, WritableSignal, signal } from '@angular/core';
import { IClickFormCounts } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class TrackFormService {
  private clickCounts = signal(0);

  incrementClickCount(): void {
    this.clickCounts.update((count) => count + 1);
  }

  getCountClicks(key: keyof IClickFormCounts) {
    return this.clickCounts();
  }

  constructor() {}
}
