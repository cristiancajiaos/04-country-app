import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { Country } from '../../interfaces/rest-countries';
import { CountryService } from '../../services/country-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  private countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  query = signal('');

  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async({params}) => {
      if (!params.query) {
        return [];
      }

      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    }
  });

  toSearch(value: string): void {
    if (!this.isLoading()) {
      this.isLoading.set(true);
      this.isError.set(null);
      this.countryService.searchByCountry(value).subscribe({
      next: (resp) => {
        this.countries.set(resp.data.objects)
      },
      error: (error) => {
        console.error(error);
        this.countries.set([]);
        this.isError.set(error);
      },
      complete: () => {
        console.log('Observable complete');
        this.isLoading.set(false);
      }
    });
    }

  }
}
