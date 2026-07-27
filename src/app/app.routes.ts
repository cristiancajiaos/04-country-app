import { Routes } from '@angular/router';
import { HomePage } from './shared/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full'},
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then(m => m.CountryRoutes)},
  {
    path: '**',
    redirectTo:'/',
    pathMatch: 'full'
  }
];
