import { Injectable } from '@angular/core';
import {
  catchError, concatMap, delay,
  delayWhen, iif, map,
  Observable, of,
  retryWhen,
  take,
  tap,
  throwError,
  timer
} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getData(name: string): Observable<any> {
    return this.http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + name).pipe(
      retryWhen(errors => {
        return errors.pipe(
          concatMap((e, i) =>
            iif(
              () => i > 2,
                      throwError(e),
                      of(e).pipe(delay(1000))
            )
          )
        )
      }),
      take(1)
    )
  }
}
