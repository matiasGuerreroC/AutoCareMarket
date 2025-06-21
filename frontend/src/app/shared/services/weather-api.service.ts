import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly API_KEY = '00699a1a425bce6e4a3daddf1b447487'; 
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string) {
    const url = `${this.BASE_URL}?q=${city}&appid=${this.API_KEY}&units=metric&lang=es`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        descripcion: data.weather[0].description,
        icono: data.weather[0].icon,
        temperatura: data.main.temp,
        ciudad: data.name,
        pais: data.sys.country
      })),
      catchError(err => {
        console.error('Error al obtener clima:', err);
        return of(null);
      })
    );
  }

  getWeatherByCoords(lat: number, lon: number) {
    const url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=es`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        descripcion: data.weather[0].description,
        icono: data.weather[0].icon,
        temperatura: data.main.temp,
        ciudad: data.name,
        pais: data.sys.country
      })),
      catchError(err => {
        console.error('Error al obtener clima por coordenadas:', err);
        return of(null);
      })
    );
  }
}
