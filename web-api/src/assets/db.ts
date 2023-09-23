import {
  TasksType,
  UserDetails,
} from '@ui-angular-api-expjs-org-application/types';

export const Users: UserDetails[] = [
  {
    id: 0,
    name: 'Abhishek',
    email: 'abhishek@gmail.com',
    password: 'Test@123',
  },
  {
    id: 1,
    name: 'Awadalkar',
    email: 'awadalkar@gmail.com',
    password: 'Test@123',
  },
];
export const allUsersTasks: TasksType[] = [
  {
    id: 0,
    name: 'Tim',
    tasks: [
      {
        id: 1,
        taskDetails: 'Complete this allication this is your first task',
      },
    ],
  },
  {
    id: 1,
    name: 'Jane',
    tasks: [
      {
        id: 1,
        taskDetails: 'Complete this application this is your first task',
      },
    ],
  },
];
