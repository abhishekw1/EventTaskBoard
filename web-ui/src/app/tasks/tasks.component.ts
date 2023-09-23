import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'ui-tasks',
  template: `
    <ng-container *ngFor="let userTask of taskService.tasksObservable | async">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ userTask.name }}</mat-card-title>
          <button
            mat-raised-button
            routerLink="/add-new-task/{{ userTask.id }}/{{ userTask.name }}"
            routerLinkActive="active"
          >
            Add New Task
          </button>
        </mat-card-header>
        <mat-card-content>
          <hr />
          <mat-card
            *ngFor="let task of userTask.tasks"
            style="margin-bottom: 0.5rem;"
          >
            <mat-card-content>{{ task.taskDetails }}</mat-card-content>
          </mat-card>
        </mat-card-content>
      </mat-card>
      <br />
    </ng-container>
  `,
  styles: [
    `
      mat-card-header {
        justify-content: space-between;
      }
      button {
        float: right;
      }
    `,
  ],
})
export class TasksComponent implements OnInit{
  constructor(public taskService: TaskService) {}
  ngOnInit(): void {
      this.taskService.getAllTasks();
  }
}
