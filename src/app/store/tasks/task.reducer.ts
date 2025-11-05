import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Task, TaskFilter } from '../../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<Task> {
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
  filter: TaskFilter;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: (a: Task, b: Task) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
});

export const initialState: TaskState = taskAdapter.getInitialState({
  selectedTaskId: null,
  loading: false,
  error: null,
  filter: {}
});

export const taskReducer = createReducer(
  initialState,
  
  // Load Tasks
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, {
      ...state,
      loading: false,
      error: null
    })
  ),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Task
  on(TaskActions.loadTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTaskSuccess, (state, { task }) =>
    taskAdapter.upsertOne(task, {
      ...state,
      loading: false,
      error: null
    })
  ),
  on(TaskActions.loadTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Task
  on(TaskActions.createTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.createTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, {
      ...state,
      loading: false,
      error: null
    })
  ),
  on(TaskActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Task
  on(TaskActions.updateTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) =>
    taskAdapter.updateOne(
      { id: task.id, changes: task },
      {
        ...state,
        loading: false,
        error: null
      }
    )
  ),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Task
  on(TaskActions.deleteTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) =>
    taskAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
      selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId
    })
  ),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select Task
  on(TaskActions.selectTask, (state, { id }) => ({
    ...state,
    selectedTaskId: id
  })),

  // Filter Tasks
  on(TaskActions.setTaskFilter, (state, { filter }) => ({
    ...state,
    filter
  })),
  on(TaskActions.clearTaskFilter, (state) => ({
    ...state,
    filter: {}
  }))
);
