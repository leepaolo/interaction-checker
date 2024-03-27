import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'about', loadComponent: () => import('./pages/about.component') },
  { path: 'work', loadComponent: () => import('./pages/work.component') },
  { path: 'contact', loadComponent: () => import('./pages/contact.component') },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component'),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
