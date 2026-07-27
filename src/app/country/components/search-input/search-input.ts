import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  searchInput = output<string>();

  placeholder = input('Buscar');

  onSearch(value: string): void {
    this.searchInput.emit(value);
  }
}
