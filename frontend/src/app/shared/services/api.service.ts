import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  getProductoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  getProductosDestacados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/destacados`);
  }

  // Reseñas
  getResenas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/resenas`);
  }

  getResenasPorProducto(idProducto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/resenas/product/${idProducto}`);
  }
}
