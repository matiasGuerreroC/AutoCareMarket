import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'; // Ajusta la ruta si es necesario

interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_SERVER_ADDRESS: string = environment.apiUrl;
  private token: string | null = null;
  private userData = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loadToken();
  }

  // Métodos auxiliares (puedes mantener los que ya tienes)
  loadToken() {
    this.token = localStorage.getItem('auth-token');
    if (this.token) {
      // Podrías cargar datos de usuario aquí si lo deseas
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getUserData() {
    return this.userData.asObservable();
  }

  saveAuthData(token: string, user: any) {
    this.token = token;
    localStorage.setItem('auth-token', token);
    this.userData.next(user);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
    this.userData.next(null);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Método de Registro - MODIFICADO
  register(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    documentType: string,
    // documentNumber: string, // Si lo usas
    phone: string
  ): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/auth/register`, {
      username,
      email,
      password,
      firstName,
      lastName,
      documentType,
      // documentNumber, // Si lo usas
      phone
    }).pipe(
      tap(res => {
        // Puedes decidir loguear al usuario automáticamente después del registro o no
        // this.saveAuthData(res.token, res.user);
      }),
      catchError(e => {
        throw new Error(e.error?.message || 'Error en el registro');
      })
    );
  }

  // Método de Login (puedes mantener el que ya tienes)
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/auth/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          this.saveAuthData(res.token, res.user);
        }
      }),
      catchError(e => {
        throw new Error(e.error?.message || 'Error desconocido al iniciar sesión');
      })
    );
  }
}