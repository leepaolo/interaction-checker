import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TrackPagesService } from './services/track-pages.service';
import NavbarComponent from './components/navbar.component';
import DashboardComponent from './pages/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DashboardComponent],
  template: `
    <app-navbar />
    <div class="max-w-screen-lg mx-3 lg:mx-auto">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'interaction-checker';

  constructor(
    private router: Router,
    private trackingPageService: TrackPagesService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Additional check for TypeScript's benefit
          // General page view increment logic can go here
          this.trackingPageService.incrementPageView();

          if (event.urlAfterRedirects.includes('/about')) {
            this.trackingPageService.setIncAboutPage();
          } else if (event.urlAfterRedirects.includes('/work')) {
            this.trackingPageService.setIncWorkPage();
          } else if (event.urlAfterRedirects.includes('/contact')) {
            this.trackingPageService.setIncContactPage();
          } else if (event.urlAfterRedirects.includes('/dashboard')) {
            this.trackingPageService.setIncDashboardPage();
          }
        }
      });
  }
}
