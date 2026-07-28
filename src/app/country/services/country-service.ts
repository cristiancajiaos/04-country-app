import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country, RESTCountry } from '../interfaces/rest-countries';

@Service()
export class CountryService {

  private httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<RESTCountry> {
    const queryToSend = query.toLowerCase().replace(" ", "+");

    return this.httpClient.get<RESTCountry>(`${environment.restCountriesApiUrl}/capitals/${queryToSend}`, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`
      }
    }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error("No se pudo obtener países"))
      })
    )
  }

  searchByCountry(query: string): Observable<RESTCountry> {
    const queryToSend = query.toLowerCase();

    return this.httpClient.get<RESTCountry>(`${environment.restCountriesApiUrl}`, {
      params: {
        q: queryToSend
      },
      headers: {
        Authorization: `Bearer ${environment.apiKey}`
      }
    }).pipe(
      delay(3000),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error("No se pudo obtener países"))
      })
    )
  }

  searchCountryByAlphaCode(code: string) {
    const queryToSend = code.toLowerCase();

    return this.httpClient.get<RESTCountry>(`${environment.restCountriesApiUrl}/code`,
      {
        params: {
          q: queryToSend
        },
        headers: {
          Authorization: `Bearer ${environment.apiKey}`
        }
      }
    ).pipe(
      map(foo => foo.data.objects.at(0)),
      catchError((error) => {
        return throwError(() => new Error(`No se pudo obtener países con el código ${code}`))
      })
    )
  }
}
