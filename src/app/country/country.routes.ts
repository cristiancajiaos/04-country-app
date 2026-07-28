import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { CountryLayout } from './layouts/country-layout/country-layout';
import { ByCountryPage } from './pages/by-country-page/by-country-page';
import { ByRegionPage } from './pages/by-region-page/by-region-page';
import { CountryPage } from './pages/country-page/country-page';

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
        path: 'by-country',
        component: ByCountryPage,
        pathMatch: 'full'
      },
      {
        path: 'by-region',
        component: ByRegionPage,
        pathMatch: 'full'
      },
      {
        path: 'by/:code',
        component: CountryPage,
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
