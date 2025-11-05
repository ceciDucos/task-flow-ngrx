import { createAction, props } from '@ngrx/store';
import { Task, TaskFilter } from '../../models/task.model';

// Load Tasks
export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

// Load Single Task
export const loadTask = createAction(
  '[Task] Load Task',
  props<{ id: string }>()
);
export const loadTaskSuccess = createAction(
  '[Task] Load Task Success',
  props<{ task: Task }>()
);
export const loadTaskFailure = createAction(
  '[Task] Load Task Failure',
  props<{ error: string }>()
);

// Create Task
export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: string }>()
);

// Update Task
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ id: string; updates: Partial<Task> }>()
);
export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
);
export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: string }>()
);

// Delete Task
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);
export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: string }>()
);

// Select Task
export const selectTask = createAction(
  '[Task] Select Task',
  props<{ id: string | null }>()
);

// Filter Tasks
export const setTaskFilter = createAction(
  '[Task] Set Filter',
  props<{ filter: TaskFilter }>()
);

export const clearTaskFilter = createAction('[Task] Clear Filter');
