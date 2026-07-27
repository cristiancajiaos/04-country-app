import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/rest-countries';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
})
export class CountryList {

  countries = input.required<Country[]>();
}
