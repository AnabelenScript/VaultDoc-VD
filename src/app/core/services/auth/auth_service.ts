import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './auth_model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private apiUrl = 'http://localhost:8081/users/login';

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (this.isBrowser()) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          console.log(response.user)
        }
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('auth_token');
  }

  getUser(): any {
    if (!this.isBrowser()) return null;
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;
  }
}