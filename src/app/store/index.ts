import { ActionReducerMap } from '@ngrx/store';
import { TaskState, taskReducer } from './tasks/task.reducer';

export interface AppState {
  tasks: TaskState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer
};
