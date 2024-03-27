import { WritableSignal } from '@angular/core';

export interface IClickCounts {
  about: WritableSignal<number>;
  work: WritableSignal<number>;
  contact: WritableSignal<number>;
  dashboard: WritableSignal<number>;
}

export interface IClickFormCounts {
  buttonSend: WritableSignal<number>;
  buttonReset: WritableSignal<number>;
}
