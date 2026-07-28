import { Component, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { Country } from '../../interfaces/rest-countries';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countries = signal<Country[]>([]);

  receiveSearchInput(value: string): void {
    console.log({value});
  }
}
