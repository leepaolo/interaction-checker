import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import NavbarComponent from './components/navbar/navbar.component';
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
}
