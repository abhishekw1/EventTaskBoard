import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ui-header',
  template: `
    <div class="heading">
      <h1>Event Task Board</h1>
      <div class="gap"></div>
      <h3 *ngIf="authService.isAuthenticated">
        Welcome {{ authService.name }}
      </h3>
    </div>
    <nav>
      <button
        mat-raised-button
        routerLink="/"
        routerLinkActive="active"
        matTooltip="All User Tasks"
      >
        All Tasks
      </button>
      <button
        mat-raised-button
        routerLink="/search-user"
        routerLinkActive="active"
        matTooltip="Search Taks By User"
      >
        Search User
      </button>
      <button
        mat-raised-button
        routerLink="/add-user"
        routerLinkActive="active"
        matTooltip="Add New User"
      >
        Add User
      </button>
      <div style="flex:1 1 auto;"></div>
      <button
        mat-raised-button
        routerLink="/login"
        routerLinkActive="active"
        *ngIf="!authService.isAuthenticated"
      >
        Login
      </button>
      <button
        mat-raised-button
        *ngIf="authService.isAuthenticated"
        (click)="logout()"
      >
        Logout
      </button>
      <button
        mat-raised-button
        routerLink="/register"
        routerLinkActive="active"
        *ngIf="!authService.isAuthenticated"
      >
        Register
      </button>
    </nav>
  `,
  styles: [
    `
      .heading {
        display: flex;
        align-items: center;
      }
      .gap {
        flex: 1 1 auto;
      }
      nav {
        margin-bottom: 1rem;
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .active span {
        background: gainsboro;
      }
    `,
  ],
})
export class HeaderComponent {
  isAuthenticated: boolean;
  name: string;
  constructor(public authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
