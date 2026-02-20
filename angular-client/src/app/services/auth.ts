import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/users';

  isAuthenticated = signal<boolean>(false);

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap(() => this.isAuthenticated.set(true))
    );
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap(() => this.isAuthenticated.set(true))
    );
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`).pipe(
      tap(() => this.isAuthenticated.set(false))
    );
  }
}