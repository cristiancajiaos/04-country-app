import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries';

@Service()
export class CountryService {

  private httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<RESTCountry> {
    const queryToSend = query.toLowerCase().replace(" ", "+");

    return this.httpClient.get<RESTCountry>(`${environment.restCountriesApiUrl}/capitals/${queryToSend}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`
      }
    })
  }
}
