import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskType, TasksType } from 'types/src/lib/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  _url = 'http://localhost:3000';
  tasksSubject: BehaviorSubject<TasksType[]> = new BehaviorSubject<TasksType[]>(
    null
  );
  tasksObservable: Observable<TasksType[]> = this.tasksSubject.asObservable();
  constructor(
    private httpClient: HttpClient,
    private matSnackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.httpClient.get<TasksType[]>(this._url + '/api/all-tasks').subscribe({
      next: (value: TasksType[]) => {
        this.tasksSubject.next(value);
      },
      error: () => {
        this.handleError('Unable to Get Tasks');
      },
    });
  }
  getTasksByName(name: string): Observable<TasksType> {
    return this.httpClient.get<TasksType>(this._url + `/api/tasks/${name}`);
  }
  postTasks(id: number, taskObj: TaskType): void {
    this.httpClient
      .post<TaskType>(this._url + `/api/task/${id}`, taskObj)
      .subscribe({
        next: (value: TaskType) => {
          if (value) {
            this.getAllTasks();
          }
        },
        error: () => {
          this.handleError('Unable to Post Tasks');
        },
      });
  }
  private handleError(error: string): void {
    this.matSnackBar.open(error, 'close', {
      duration: 3000,
    });
  }
}
