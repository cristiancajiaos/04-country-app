import { Component, inject, resource, signal, WritableSignal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/rest-countries';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  private countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  query = signal('');

  /*
  countryResource = rxResource({
    params: () => ({query: this.query()}),
    loader: ({params}) => {
      if (!params.query) {
        return of([]);
      }

      return this.countryService.searchByCapital(params.query)
    }
  })
  */

  /*
  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async({params}) => {
      if (!params.query) {
        return [];
      }

      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      );
    }
  })
    */


  toSearch(query: string): void {
    if (!this.isLoading()) {
      this.isLoading.set(true);
      this.isError.set(null);

      this.countryService.searchByCapital(query).subscribe({
        next: (resp) => {
          this.countries.set(resp.data.objects);
          console.log(this.countries());
        },
        error: (error) => {
          this.isError.set(`No se encontró un país con la capital ${query}`);
          this.countries.set([]);
          console.error(error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }
}
