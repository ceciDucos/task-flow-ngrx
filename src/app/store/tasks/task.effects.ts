import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TaskApiService } from '../../services/task-api.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskApiService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTask),
      switchMap(({ id }) =>
        this.taskService.getTaskById(id).pipe(
          map(task => TaskActions.loadTaskSuccess({ task })),
          catchError(error =>
            of(TaskActions.loadTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap(({ task }) =>
        this.taskService.createTask(task).pipe(
          map(newTask => TaskActions.createTaskSuccess({ task: newTask })),
          catchError(error =>
            of(TaskActions.createTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ id, updates }) =>
        this.taskService.updateTask(id, updates).pipe(
          map(task => TaskActions.updateTaskSuccess({ task })),
          catchError(error =>
            of(TaskActions.updateTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError(error =>
            of(TaskActions.deleteTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
