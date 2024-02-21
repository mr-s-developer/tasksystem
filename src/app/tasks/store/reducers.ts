import { createFeature, createReducer, on } from '@ngrx/store';

import { TasksState } from '../types/tasks';
import { tasksActions } from './actions';

const initialState: TasksState = {
  isLoading: false,
  tasks: undefined,
  createdTask: null,
  deletedTask: null,
  validationError: null,
}

const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialState,
    on(tasksActions.taskList, (state)                => ({ ...state, isLoading: true, validationError: null }) ),
    on(tasksActions.taskListSuccess, (state, action) => ({ ...state, isLoading: false, tasks: { list: action.tasks, paginatorResultsLength: action.paginatorResultsLength } }) ),
    on(tasksActions.taskListFailure, (state, action) => ({ ...state, isLoading: false, validationError: action.errors }) ),

    on(tasksActions.taskRemove, (state)                => ({ ...state, isLoading: true, validationError: null }) ),
    on(tasksActions.taskRemoveSuccess, (state, action) => ({ ...state, isLoading: false, deletedTask: action.id }) ),
    on(tasksActions.taskRemoveFailure, (state, action) => ({ ...state, isLoading: false, validationError: action.errors }) ),

    on(tasksActions.taskCreate, (state)                 => ({ ...state, isLoading: true, validationError: null }) ),
    on(tasksActions.taskCreateSuccess, (state, action)  => ({ ...state, isLoading: false, createdTask: action.createdTask }) ),
    on(tasksActions.taskCreateFailure, (state, action)  => ({ ...state, isLoading: false, validationError: action.errors }) ),
    on(tasksActions.taskCreatedRemoveFromStore, (state) => ({ ...state, createdTask: null }) ),
  )
});

export const { 
  name: tasksFeatureKey, 
  reducer: tasksReducer,
  selectIsLoading,
  selectTasks,
  selectCreatedTask,
  selectDeletedTask,
  selectValidationError,
} = tasksFeature;