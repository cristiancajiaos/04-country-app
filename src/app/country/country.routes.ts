import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';

export const CountryRoutes: Routes = [
  {path: '', component: ByCapitalPage, pathMatch: 'full'}
];

export default CountryRoutes;
