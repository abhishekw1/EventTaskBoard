import { Route } from '@angular/router';
import { AddNewTaskComponent } from './tasks/add-task.component';
import { SearchUserComponent } from './users/search-user.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddUserComponent } from './users/add-user.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'search-user',
    component: SearchUserComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'add-new-task/:id/:name',
    component: AddNewTaskComponent,
  },
  {
    path: '**',
    component: TasksComponent,
  },
];
