import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsApiService {

  private API_URL = 'https://api.api-ninjas.com/v1/cars';
  private API_KEY = 'FoqF7N8ep+4Nc+pwtqszcg==1IoSIxtQuwpBanQB';

  constructor(private http: HttpClient) {}

  getCars(make: string, model?: string): Observable<any> {
    let params = new HttpParams().set('make', make);
    if (model) params = params.set('model', model);

    const headers = new HttpHeaders().set('X-Api-Key', this.API_KEY);

    return this.http.get<any>(this.API_URL, { headers, params });
  }
}
