import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TasksType } from 'types/src/lib/types';

@Component({
  selector: 'ui-search-user',
  template: `
    <mat-card>
      <mat-card-content>
        <mat-form-field class="search-form-field">
          <mat-label>Enter User Name</mat-label>
          <input matInput type="text" [(ngModel)]="name" />
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="onSearch()">
          Search
        </button>
      </mat-card-content>
    </mat-card>
    <br />
    <ng-container *ngIf="isSearched">
      <ng-container *ngIf="userTasks; else nouserfound">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ userTasks.name }}</mat-card-title>
            <button
              mat-raised-button
              routerLink="/add-new-task/{{ userTasks.id }}/{{ userTasks.name }}"
              routerLinkActive="active"
            >
              Add New Task
            </button>
          </mat-card-header>
          <mat-card-content>
            <hr />
            <mat-card
              *ngFor="let task of userTasks.tasks"
              style="margin-bottom: 0.5rem;"
            >
              <mat-card-content>{{ task.taskDetails }}</mat-card-content>
            </mat-card>
          </mat-card-content>
        </mat-card>
      </ng-container>
      <ng-template #nouserfound>
        <mat-card>
          <mat-card-content>No User Found</mat-card-content>
        </mat-card>
      </ng-template>
    </ng-container>
  `,
  styles: [
    `
      mat-card {
        margin: auto;
      }
      mat-card-header {
        justify-content: space-between;
      }
      .search-form-field {
        width: 100%;
      }
      button {
        float: right;
      }
    `,
  ],
})
export class SearchUserComponent {
  name: string;
  userTasks: TasksType;
  isSearched = false;
  constructor(public taskService: TaskService) {}

  onSearch() {
    this.taskService.getTasksByName(this.name).subscribe((res) => {
      this.userTasks = res;
      this.isSearched = true;
    });
  }
}
