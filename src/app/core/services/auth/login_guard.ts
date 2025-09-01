import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanMatch {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;

    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
