import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDetails } from '@ui-angular-api-expjs-org-application/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  get name() {
    return localStorage.getItem('name');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  get tokenHeader() {
    return localStorage.getItem('token');
  }
  login(userCredentials: { email: string; password: string }) {
    this.http
      .post('/auth/login', userCredentials)
      .subscribe((res: { firstName: string; token: string }) => {
        this.handleAunticate(res);
      });
  }

  register(value: UserDetails) {
    delete value.confirmpassword;
    this.http
      .post('/auth/register', value)
      .subscribe((res: { firstName: string; token: string }) => {
        this.handleAunticate(res);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }
  private handleError(error: string): void {
    this.matSnackBar.open(error, 'close', {
      duration: 3000,
    });
  }
  handleAunticate(res) {
    const authResponse = res;
    if (!authResponse.token) return;
    localStorage.setItem('token', res.token.toString());
    localStorage.setItem('name', res.firstName.toString());
    this.router.navigate(['/']);
  }
}
