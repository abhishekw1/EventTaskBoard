import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskType } from 'types/src/lib/types';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ui-new-task',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title> Add New Task For {{ userName }} </mat-card-title>
      </mat-card-header>
      <br />
      <mat-card-content>
        <div class="task-form" style="display: flex;flex-direction:column">
          <mat-form-field class="example-full-width">
            <mat-label>Task No.</mat-label>
            <input matInput type="number" placeholder="Task No." [(ngModel)]="taskObj.id" />
          </mat-form-field>
          <mat-form-field class="example-full-width">
            <mat-label>Add a task</mat-label>
            <textarea
              matInput
              placeholder="Add a task"
              [(ngModel)]="taskObj.taskDetails"
            ></textarea>
          </mat-form-field>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="onPost()">Add Task</button>
        <button mat-raised-button color="warn" routerLink="/">Cancle</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      mat-card-actions {
        justify-content: space-between;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewTaskComponent implements OnInit {
  taskObj: TaskType = {
    id: null,
    taskDetails: '',
  };
  userName = '';
  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['name'];
  }
  onPost(): void {
    const taskId = this.activatedRoute.snapshot.params['id'];
    this.taskService.postTasks(taskId, this.taskObj);
    this.router.navigate(['/']);
  }
}
