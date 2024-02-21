import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { BackendErrors } from '../../shared/types/backend-errors';
import { CreateTask, Task, TaskListRequest } from '../types/tasks';

export const tasksActions = createActionGroup({
  source: 'tasks',
  events: {
    'Task list': (payload: TaskListRequest) => ({ payload }),
    'Task list success': props<{ paginatorResultsLength: number, tasks: Task[] }>(),
    'Task list failure': props<{ errors: BackendErrors }>(),

    'Task remove': (id: number) => ({ id }),
    'Task remove success': props<{ id: number }>(),
    'Task remove failure': props<{ errors: BackendErrors }>(),

    'Task create': (payload: CreateTask) => ({ payload }),
    'Task create success': props<{ createdTask: CreateTask }>(),
    'Task create failure': props<{ errors: BackendErrors }>(),
    'Task created remove from store': emptyProps()
  }
});