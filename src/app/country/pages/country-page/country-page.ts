import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/rest-countries';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);

  country = signal<Country | undefined | null>(null);

  countryCode = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['code'])
    )
  );

  ngOnInit(): void {
    if (!this.isLoading()) {
      this.isLoading.set(true);
      this.isError.set(null);
      this.countryService.searchCountryByAlphaCode(this.countryCode()).subscribe({
      next: (country) => {
        this.country.set(country);
      },
      error: (error) => {
        console.error(error);
        this.country.set(null);
        this.isError.set(error);
      },
      complete: () => {
        this.isLoading.set(false);

      }
    });
    }

  }
}
