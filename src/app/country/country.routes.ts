import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { CountryLayout } from './layouts/country-layout/country-layout';

export const CountryRoutes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPage,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

export default CountryRoutes;
