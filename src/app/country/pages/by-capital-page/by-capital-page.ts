import { Component, inject, signal, WritableSignal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/rest-countries';

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

  toSearch(value: string): void {
    if (!this.isLoading()) {
      this.isLoading.set(true);
      this.isError.set(null);

      this.countryService.searchByCapital(value).subscribe({
        next: (resp) => {
          this.countries.set(resp.data.objects);
          console.log(this.countries());
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Observable complete');
          this.isLoading.set(false);
        },
      });
    }
  }
}
