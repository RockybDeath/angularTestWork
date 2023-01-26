import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getData(name: string): Observable<any> {
    return this.http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + name);
  }
}
