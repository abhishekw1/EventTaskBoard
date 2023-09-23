import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private matSnackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  getUserProfile() {
    const headers = new HttpHeaders().set('Authorization', this.authService.tokenHeader);
    return this.httpClient.get('/api/users/me', { headers: headers });
  }

  addNewUser(name: string): void {
    this.httpClient
      .post<string>(`/api/add-new-user`, { name: name })
      .subscribe({
        next: (value: string) => {
          if (value) {
            this.handleError('User Added Sucessfully');
          }
        },
        error: () => {
          this.handleError('User Added Faild');
        },
      });
  }
  private handleError(error: string): void {
    this.matSnackBar.open(error, 'close', {
      duration: 3000,
    });
  }
}
