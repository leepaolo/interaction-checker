import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardService } from '../../services/track-navbar.service';
import { IClickCounts } from '../../models/dashboard';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: ` <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
      </div>
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="navbar-center ">
      <ul class="menu menu-horizontal px-1 gap-2">
        <li routerLink="about">
          <button class="btn btn-primary" (click)="trackClickNavBar('about')">
            About me
          </button>
        </li>
        <li routerLink="news">
          <button class="btn btn-primary" (click)="trackClickNavBar('news')">
            Work
          </button>
        </li>
        <li routerLink="contact">
          <button class="btn btn-primary" (click)="trackClickNavBar('contact')">
            Keep in touch
          </button>
        </li>
        <li routerLink="dashboard">
          <button
            class="btn btn-secondary"
            (click)="trackClickNavBar('dashboard')"
          >
            Dashboard
          </button>
        </li>
      </ul>
    </div>
  </div>`,
})
export default class NavbarComponent {
  private dashboardService = inject(DashboardService);

  trackClickNavBar(buttonName: string) {
    let button = buttonName as keyof IClickCounts;

    this.dashboardService.incrementClickCount(button);
  }
}
