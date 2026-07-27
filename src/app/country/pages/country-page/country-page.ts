import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
})
export class CountryPage {
  private activatedRoute = inject(ActivatedRoute);

  code = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['code'])
    )
  );
}
