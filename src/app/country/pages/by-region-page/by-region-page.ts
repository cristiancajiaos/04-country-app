import { Component, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { Country } from '../../interfaces/rest-countries';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

  countries = signal<Country[]>([]);
}
