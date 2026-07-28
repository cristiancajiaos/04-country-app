import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/rest-countries';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {

  country = input.required<Country | null>();
}
