import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrackFormService } from '../services/track-form.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col items-center">
      <h1 class="text-3xl">Let's Keep In Touch</h1>
      <br />
      <form [formGroup]="formContact" class="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Name"
          formControlName="name"
          class="input input-bordered input-primary w-full max-w-xs"
        />
        <input
          type="email"
          placeholder="Email"
          formControlName="email"
          class="input input-bordered input-primary w-full max-w-xs"
        />
        <button
          (click)="onSendForm()"
          [disabled]="formContact.invalid"
          class="btn btn-primary w-full max-w-xs"
        >
          SEND
        </button>
      </form>
    </div>
  `,
})
export default class ContactComponent {
  trackFormService = inject(TrackFormService);

  formContact = new FormGroup({
    name: new FormControl('', Validators.required), // Apply the required validator
    email: new FormControl('', [Validators.required, Validators.email]), // Apply both required and email validators
  });

  onSendForm(): void {
    if (!this.formContact.invalid) {
      this.trackFormService.incrementClickCount();
      alert(JSON.stringify(this.formContact.value));
    }
  }
}
